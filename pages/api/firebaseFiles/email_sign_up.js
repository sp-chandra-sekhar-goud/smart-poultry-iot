import { firebase } from "googleapis/build/src/apis/firebase";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      res.status(200).json({ user });
    } catch (error) {
      // Check if the error is due to email already being in use
      if (error.code === 'auth/email-already-in-use') {
        res.status(400).json({ message: 'Email is already in use. Please sign in instead.' });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
