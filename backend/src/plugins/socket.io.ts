import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { Server as SocketIOServer, Socket } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: SocketIOServer;
  }
}

function leaveAllRooms(socket: Socket) {
  for (const roomName of socket.rooms) {
    socket.leave(roomName);
  }
}

const socketIOPlugin: FastifyPluginAsync = fp(
  async (fastify) => {
    const io = new SocketIOServer(fastify.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    fastify.decorate("io", io);

    io.on("connection", (socket: Socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });

      socket.on("joinRoom", (roomName) => {
        console.log("Putting socket", socket.id, "into room", roomName + "...");
        leaveAllRooms(socket);
        socket.join(roomName);
      });

      socket.on("leaveRoom", () => {
        leaveAllRooms(socket);
      });
    });

    fastify.addHook("onClose", (_, done) => {
      io.close();
      done();
    });
  },
  {
    name: "socket-io-plugin",
  },
);

export default socketIOPlugin;
