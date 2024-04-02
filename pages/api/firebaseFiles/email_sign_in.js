
import { firebase } from 'googleapis/build/src/apis/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      res.status(200).json({ user });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        res.status(400).json({ message: 'No user exists with the provided email and password.' });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
