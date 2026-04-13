import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Real-time Chat Logic
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
      // Broadcast message to everyone
      io.emit("receive_message", {
        ...data,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Simulated Lottery Notifications
  setInterval(() => {
    const types = ["start", "end"];
    const type = types[Math.floor(Math.random() * types.length)];
    const message = type === "start" 
      ? "🚀 Um novo sorteio da Roleta da Sorte começou! Tente a sua sorte agora."
      : "⚠️ O sorteio atual termina em 5 minutos! Garanta os seus tickets.";
    
    io.emit("lottery_notification", {
      type,
      message,
      timestamp: new Date().toISOString()
    });
  }, 60000); // Every minute for demo purposes

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
