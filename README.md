# API Radar

Um projeto full-stack em TypeScript para monitorar saúde e performance de APIs externas, com atualizações em tempo real por WebSockets.

---

## 🚀 Visão Geral

Este dashboard recolhe métricas (latência, status, tempo de resposta) de múltiplas APIs, armazena num banco PostgreSQL via Prisma, e exibe gráficos interativos em React (Vite). O backend em Fastify envia eventos em tempo real usando Socket.IO.

### 🛠 Tecnologias

- **Frontend**
  - React (Vite)
  - Chart.js
- **Backend**
  - Fastify
  - Socket.IO
  - Prisma ORM
- **Banco de Dados**
  - PostgreSQL

---

## 📦 Funcionalidades

- ✅ **Coleta periódica** de métricas de endpoints configuráveis
- ✅ **Dashboard interativo** com gráficos de latência, throughput e status
- ✅ **Atualização em tempo real** via WebSockets (Socket.IO)
- ✅ **Gestão de serviços** (adicionar/remover APIs)
- ✅ **Alertas customizáveis** (e-mail, Discord, Telegram)

---

## 📄 Licença

MIT © [joojdev](https://github.com/joojdev)
