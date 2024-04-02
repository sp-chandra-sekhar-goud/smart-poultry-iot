import { firebase } from "googleapis/build/src/apis/firebase";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const idToken = req.body.idToken;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    try {
      const userCredential = await firebase.auth().signInWithCredential(credential);
      const user = userCredential.user;
      // Check if it's a new user, if so, proceed with sign-up process
      if (userCredential.additionalUserInfo.isNewUser) {
        // Perform any additional sign-up actions if needed
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
