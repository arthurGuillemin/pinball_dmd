const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3000";

class SocketService {
  constructor() {
    this.dmd = null;
    this.screenListeners = [];
  }

  connect() {
    this.dmd = new WebSocket(`${WS_URL}/screens`);
    this.dmd.onopen = () => console.log("[DmD] connecté ✅");
    this.dmd.onclose = () => console.log("[DmD] déconnecté");
    this.dmd.onerror = (e) => console.error("[DmD] erreur", e);
    this.dmd.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        this.screenListeners.forEach((cb) => cb(data));
      } catch (err) {
        console.error("[DmD] parsing error", err);
      }
    };
  }
  onScreenMessage(cb) {
    this.screenListeners.push(cb);
  }
  disconnect() {
    this.dmd?.close();
    this.screenListeners = [];
  }
}

const socketService = new SocketService();
export default socketService;
