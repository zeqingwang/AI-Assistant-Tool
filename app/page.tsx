"use client";
import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import CodeInput from "../components/CodeInput";
import ResultPanel from "../components/ResultPanel";

export default function Page() {
  const [code, setCode] = React.useState("");
  const [tone, setTone] = React.useState<"concise" | "detailed">("concise");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [summary, setSummary] = React.useState("");
  const [improvements, setImprovements] = React.useState("");

  const runAssistant = async () => {
    setLoading(true);
    setError(null);
    setSummary("");
    setImprovements("");

    try {
      const parseErrorMessage = async (res: Response) => {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const body = await res.json().catch(() => ({}));
          return (
            body?.error ||
            body?.message ||
            `Request failed with status ${res.status}`
          );
        }
        const text = await res.text();
        if (text) return text;
        return `Request failed with status ${res.status}`;
      };

      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, tone }),
      });

      if (!res.ok) {
        const msg = await parseErrorMessage(res);
        throw new Error(msg);
      }

      const data = await res.json();
      setSummary(data.summary || "");
      setImprovements(data.improvements || "");
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
        AI Assistant Tool — Code Explainer
      </Typography>

      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: "grey.50" }}>
        <Typography variant="body1">
          Prototype for Central AI team: paste code → get docs + improvements.
        </Typography>
      </Paper>

      <CodeInput code={code} setCode={setCode} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mt={2}
        alignItems="center"
      >
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="tone-label">Output Tone</InputLabel>
          <Select
            labelId="tone-label"
            value={tone}
            label="Output Tone"
            onChange={(e) => setTone(e.target.value as any)}
          >
            <MenuItem value="concise">Concise</MenuItem>
            <MenuItem value="detailed">Detailed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          onClick={runAssistant}
          disabled={!code.trim() || loading}
        >
          Generate Documentation
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setCode("");
            setSummary("");
            setImprovements("");
            setError(null);
          }}
          disabled={loading}
        >
          Clear
        </Button>
      </Stack>

      <ResultPanel
        loading={loading}
        error={error}
        summary={summary}
        improvements={improvements}
      />
    </Box>
  );
}
