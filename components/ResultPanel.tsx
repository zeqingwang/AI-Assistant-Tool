"use client";
import * as React from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

type Props = {
  loading: boolean;
  error: string | null;
  summary: string;
  improvements: string;
};

export default function ResultPanel({
  loading,
  error,
  summary,
  improvements,
}: Props) {
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        AI Output
      </Typography>

      {loading && (
        <Box display="flex" alignItems="center" gap={2} py={2}>
          <CircularProgress size={22} />
          <Typography variant="body2">Thinking…</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 1 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (summary || improvements) && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Explanation / Documentation
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
            {summary || "—"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Suggested Improvements
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
            {improvements || "—"}
          </Typography>
        </>
      )}

      {!loading && !error && !summary && !improvements && (
        <Typography variant="body2" color="text.secondary">
          Run the assistant to see results here.
        </Typography>
      )}
    </Paper>
  );
}
