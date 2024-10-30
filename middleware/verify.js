const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Incoming Token:", token); 

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

const validate = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Optionally attach user data
        return res.status(201).json({msg: "success"});
    } catch (error) {
        console.error("Token Verification Error:", error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = { verifyToken, validate };
