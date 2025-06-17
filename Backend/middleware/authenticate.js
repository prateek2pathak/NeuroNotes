import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use cert
  });
}

export const authenticate = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  console.log(authHeaders);
  

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const idToken = authHeaders.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Includes uid, email, etc.
    console.log(decodedToken);
    
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
