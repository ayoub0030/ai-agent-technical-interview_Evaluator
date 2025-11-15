import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Collapse,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "sonner";
import type { DesignProblem } from "../../services/design.service";

interface Props {
  problems: DesignProblem[];
  total: number;
  sortBy: "asc" | "desc";
  setSortBy: (s: "asc" | "desc") => void;
  onSendProblem: (problemId: string, email: string) => Promise<void> | void;
  sendingId: string | null;
}

export default function Problems({
  problems,
  total,
  sortBy,
  setSortBy,
  onSendProblem,
  sendingId,
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        background: "rgba(4,12,29,0.82)",
        backdropFilter: "blur(26px)",
        border: "1px solid rgba(14,165,233,0.25)",
        borderRadius: 3,
        boxShadow: "0 25px 60px rgba(15,118,187,0.18)",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: 600, letterSpacing: 0.5 }}
        >
          Problems
          <Typography
            component="span"
            sx={{ ml: 2, color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}
          >
            {total} total
          </Typography>
        </Typography>

        {/* Styled Sort dropdown (MUI Select) */}
        <FormControl
          size="small"
          sx={{
            minWidth: 220,
            ".MuiInputLabel-root": {
              color: "rgba(224,242,254,0.8)",
              "&.Mui-focused": {
                color: "rgba(125,211,252,0.95)",
              },
            },
            ".MuiOutlinedInput-root": {
              background: "rgba(2,8,23,0.55)",
              borderRadius: 2,
              "&:hover fieldset": { borderColor: "rgba(14,165,233,0.7)" },
              "&.Mui-focused fieldset": { borderColor: "rgba(56,189,248,0.9)" },
            },
          }}
        >
          <InputLabel sx={{ color: "rgba(224,242,254,0.8)" }}>
            Difficulty
          </InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(14,165,233,0.4)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(14,165,233,0.7)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(56,189,248,0.9)",
              },
              ".MuiSvgIcon-root": { color: "white" },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: "rgba(3,14,30,0.98)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(14,165,233,0.35)",
                  color: "white", // <-- makes text inside dropdown white
                  "& .MuiMenuItem-root": {
                    color: "white", // ensures all items stay white
                    "&.Mui-selected": { background: "rgba(56,189,248,0.35)" },
                    "&:hover": { background: "rgba(14,165,233,0.25)" },
                  },
                },
              },
            }}
          >
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Problems list (full width) */}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
      >
        {problems.map((p) => (
          <ProblemCard
            key={p.id}
            problem={p}
            expanded={expandedId === p.id}
            onToggle={() => handleToggleExpand(p.id)}
            onSend={(email) => onSendProblem(p.id, email)}
            sending={sendingId === p.id}
          />
        ))}

        {!problems.length && (
          <Box
            sx={{
              py: 8,
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,0.6)",
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: 2,
            }}
          >
            No problems available.
          </Box>
        )}
      </Box>
    </Paper>
  );
}

function ProblemCard({
  problem,
  expanded,
  onToggle,
  onSend,
  sending,
}: {
  problem: DesignProblem;
  expanded: boolean;
  onToggle: () => void;
  onSend: (email: string) => Promise<void> | void;
  sending: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEmail("");
  };

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Please enter an applicant email");
      return;
    }
    await onSend(email.trim());
    closeDialog();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(3,12,30,0.8) 0%, rgba(2,24,44,0.9) 100%)",
        border: "1px solid rgba(56,189,248,0.25)",
        borderRadius: 2,
        transition: "all 0.25s ease",
        "&:hover": {
          borderColor: "rgba(56,189,248,0.6)",
          transform: "translateY(-2px)",
          boxShadow: "0 12px 30px rgba(15,118,187,0.25)",
        },
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <CardContent sx={{ pb: 1.5, pt: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 700,
              flex: 1,
              lineHeight: 1.3,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {problem.name}
          </Typography>

          <Chip
            label={`Level ${Number(problem.difficulty).toFixed(0)}`}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: "rgba(56,189,248,0.25)",
              color: "#e0f2fe",
              border: "1px solid rgba(14,165,233,0.6)",
            }}
          />

          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              aria-label="Send assessment"
              onClick={(e) => {
                e.stopPropagation();
                openDialog(e);
              }}
              disabled={sending}
              sx={{
                color: "white",
                bgcolor: "rgba(14,165,233,0.25)",
                border: "1px solid rgba(14,165,233,0.45)",
                "&:hover": { bgcolor: "rgba(14,165,233,0.45)" },
              }}
              size="small"
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="Expand"
              onClick={handleExpandClick}
              sx={{
                color: "rgba(255,255,255,0.85)",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
              size="small"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ opacity: 0.2 }} />
        <CardContent sx={{ pt: 2.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(224,242,254,0.9)", mb: 1, fontWeight: 700 }}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(226,232,240,0.9)", whiteSpace: "pre-line" }}
          >
            {problem.description || "No description provided."}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ px: 3, pb: 2.5, pt: 0, justifyContent: "flex-end" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="contained"
            size="medium"
            startIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setDialogOpen(true);
            }}
            disabled={sending}
            sx={{
              backgroundImage: "linear-gradient(90deg,#0ea5e9,#2563eb)",
              textTransform: "none",
              borderRadius: 1.5,
              fontWeight: 700,
              px: 2.5,
              boxShadow: "0 8px 24px rgba(3,105,161,0.35)",
              "&:hover": { filter: "brightness(1.05)" },
            }}
          >
            {sending ? "Sending…" : "Send assessment"}
          </Button>
        </CardActions>
      </Collapse>

      <Dialog
        open={dialogOpen}
        onClose={(_, reason) => {
          if (
            sending &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          )
            return;
          closeDialog();
        }}
        disableEscapeKeyDown={sending}
        keepMounted
        onClick={(e) => e.stopPropagation()}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: "rgba(4,12,29,0.95)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(56,189,248,0.3)",
            boxShadow: "0 18px 45px rgba(15,118,187,0.35)",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "white",
            fontWeight: 700,
            pb: 1.5,
          }}
        >
          Send assessment
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(14,165,233,0.25)",
            color: "rgba(255,255,255,0.9)",
            pt: 2,
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Applicant email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ readOnly: sending }}
            slotProps={{ input: { "aria-busy": sending } as any }}
            sx={{
              mt: 1,
              "& .MuiInputLabel-root": {
                color: "rgba(224,242,254,0.75)",
                "&.Mui-focused": { color: "rgba(125,211,252,0.95)" },
                "&.Mui-error": { color: "#f87171" },
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(2,8,23,0.6)",
                borderRadius: 1.5,
                transition: "border-color .2s, box-shadow .2s, background-color .2s",
                "& fieldset": { borderColor: "rgba(226,232,240,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(56,189,248,0.5)" },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(14,165,233,0.95)",
                  boxShadow: "0 0 0 3px rgba(14,165,233,0.28)",
                },
                "& input": {
                  fontWeight: 600,
                  "::placeholder": { color: "rgba(224,242,254,0.55)", opacity: 1 },
                },
                "&.MuiInputBase-readOnly": {
                  backgroundColor: "rgba(2,8,23,0.5)",
                  "& fieldset": { borderColor: "rgba(226,232,240,0.2)" },
                  cursor: "default",
                },
              },
              "& input:-webkit-autofill": {
                WebkitTextFillColor: "#fff",
                transition: "background-color 9999s ease-out",
                WebkitBoxShadow: "0 0 0px 1000px rgba(2,8,23,0.5) inset",
                boxShadow: "0 0 0px 1000px rgba(2,8,23,0.5) inset",
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid rgba(56,189,248,0.2)",
            gap: 1,
          }}
        >
          <Button
            onClick={closeDialog}
            variant="text"
            disabled={sending}
            sx={{ color: "rgba(224,242,254,0.85)" }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSend}
            variant="contained"
            disabled={sending}
            startIcon={!sending ? <ArrowForwardIcon /> : undefined}
            endIcon={
              sending ? <CircularProgress size={16} sx={{ color: "white" }} /> : undefined
            }
            sx={{
              backgroundImage: sending
                ? "linear-gradient(90deg,rgba(14,165,233,0.6),rgba(37,99,235,0.6))"
                : "linear-gradient(90deg,#0ea5e9,#2563eb)",
              textTransform: "none",
              borderRadius: 1.5,
              fontWeight: 700,
              px: 2.5,
              minWidth: 180,
              color: "white",
              boxShadow: sending
                ? "none"
                : "0 12px 28px rgba(3,105,161,0.35)",
              "&.Mui-disabled": {
                color: "white",
                opacity: 1,
              },
              "&:hover": { filter: "brightness(1.05)" },
            }}
          >
            {sending ? "Sending" : "Send assessment"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
