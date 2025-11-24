"use client";
import * as React from "react";
import { Paper, TextField, Typography, Box } from "@mui/material";

type Props = {
  code: string;
  setCode: (v: string) => void;
};

export default function CodeInput({ code, setCode }: Props) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Code Snippet
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Paste a short snippet (any language). The assistant will summarize and
        suggest improvements.
      </Typography>

      <Box mt={1}>
        <TextField
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`e.g.\nfunction add(a,b){return a+b;}`}
          fullWidth
          multiline
          minRows={8}
          maxRows={18}
          spellCheck={false}
          InputProps={{
            sx: {
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 14,
            },
          }}
        />
      </Box>
    </Paper>
  );
}
