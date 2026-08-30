import { beforeAll, afterAll, test, expect, describe } from "vitest";
import { WebSocketServer, WebSocket } from "ws";
import socketService from "../service/socket.service.js";

globalThis.WebSocket = WebSocket;

let server;

beforeAll(() => {
  server = new WebSocketServer({ port: 8585 });

  server.on("connection", (socket) => {
    socket.send("hello test");
  });
});

afterAll(() => {
  server.close();
});
describe("Test The Socket Functions (Socket.Service)", () => {
  test("Socket Connection and receive Message ", async () => {
    socketService.connect("ws://localhost:8585");
    const message = await new Promise((resolve) => {
      socketService.dmd.onmessage = (event) => {
        resolve(event.data);
      };
    });
    expect(message).toBe("hello test");
    socketService.dmd.close();
  });
});
