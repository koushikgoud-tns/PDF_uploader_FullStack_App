// import React, { useState } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   TextField,
//   Input,
//   Stack,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import SendIcon from '@mui/icons-material/Send';
// import api from '../api/backend';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState('');
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await api.post('/upload', formData);
//       setFilename(res.data.filename);
//     } catch (err) {
//       alert('Upload failed.');
//     }
//   };

//   const handleAsk = async () => {
//     setLoading(true);
//     try {
//       const res = await api.post('/ask', {
//         filename,
//         question,
//       });
//       setAnswer(res.data.answer);
//     } catch (err) {
//       setAnswer('Something went wrong!');
//     }
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
//           PDF Q&A Assistant
//         </Typography>

//         <Stack spacing={2}>
//           <Input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             inputProps={{ accept: '.pdf' }}
//           />
//           <Button
//             variant="contained"
//             startIcon={<CloudUploadIcon />}
//             onClick={handleUpload}
//             disabled={!file}
//           >
//             Upload PDF
//           </Button>

//           {filename && (
//             <>
//               <TextField
//                 fullWidth
//                 label="Ask a question"
//                 variant="outlined"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 endIcon={<SendIcon />}
//                 onClick={handleAsk}
//                 disabled={!question || loading}
//               >
//                 {loading ? 'Thinking...' : 'Ask'}
//               </Button>
//             </>
//           )}

//           {answer && (
//             <Box mt={3} p={2} bgcolor="#f9f9f9" borderRadius={2} border="1px solid #ddd">
//               <Typography variant="subtitle2" gutterBottom>
//                 Answer:
//               </Typography>
//               <Typography>{answer}</Typography>
//             </Box>
//           )}
//         </Stack>
//       </Paper>
//     </Container>
//   );
// };

// export default UploadPage;

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import api from '../api/backend';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload', formData);
      setFilename(res.data.filename);
    } catch (err) {
      alert('Upload failed.');
    }
  };

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ask', {
        filename,
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
          <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold" color="primary">
            PDF Q&A Assistant
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Upload Section */}
          <Stack spacing={2}>
            <Typography fontWeight={600}>Choose a PDF to upload</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Select File
              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Button>

            {file && (
              <Typography fontSize={14} color="text.secondary">
                Selected file: <strong>{file.name}</strong>
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleUpload}
              disabled={!file}
              sx={{ mt: 1 }}
            >
              Upload PDF
            </Button>
          </Stack>

          {/* Question Section */}
          {filename && (
            <>
              <Divider sx={{ my: 4 }} />
              <Stack spacing={2}>
                <Typography fontWeight={600}>Ask a question</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="e.g. What is the candidate's education background?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  InputProps={{
                    startAdornment: <QuestionAnswerIcon sx={{ mr: 1 }} />,
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAsk}
                  disabled={!question || loading}
                >
                  {loading ? 'Thinking...' : 'Ask'}
                </Button>
              </Stack>
            </>
          )}

          {/* Answer */}
          {answer && (
            <Box
              mt={4}
              p={2}
              bgcolor="#f9fafb"
              border="1px solid #e0e0e0"
              borderRadius={2}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Answer:
              </Typography>
              <Typography mt={1}>{answer}</Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default UploadPage;
