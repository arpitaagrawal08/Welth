# 💰 Welth – Personal & Shared Finance Platform

**Welth** is a modern full-stack web app to manage both **personal** and **shared finances** with ease. Track your income, expenses, and group spending in one beautifully organized platform. Think of it as your personal expense tracker + Splitwise, but smarter.

---

## 🚀 Features

### ✅ Personal Finance
- Add & manage personal income and expense transactions
- AI-powered receipt scanner to auto-fill transactions
- Clean dashboard with:
  - Pie chart for category-wise spending
  - Bar chart for income & expenses over time
  - Percentage slider showing income utilization
- Monthly summary email with insights

### 🤝 Shared Finance (In Progress)
- Create or join shared groups
- Track who paid what and who owes whom
- Split transactions and see real-time balances
- Separate dashboard for group expenses

### 🔒 Security & Performance
- Clerk for authentication
- Arcjet for bot protection & rate limiting
- Inngest for background tasks like scheduled email reports

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Forms & Validation:** React Hook Form, Zod
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** Clerk
- **Scheduled Jobs:** Inngest
- **Security:** Arcjet
- **Deployment:** Vercel

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/arpitaagrawal08/Welth.git
cd Welth

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Create .env file
cp .env.example .env
# Then add your environment variables in the .env file

# 4. Push database schema
npx prisma db push

# 5. Run the dev server
npm run dev
# or
yarn dev
# or
pnpm dev

🌱 Upcoming Features
-> Shared finance group settlement

-> Real-time notifications

-> AI-based monthly saving suggestions

-> PDF export of financial reports

-> Group reminders for pending balances


## 👩‍💻 Made By

**Arpita Agrawal**  
💼 [GitHub](https://github.com/arpitaagrawal08)  
🚀 Built with Next.js, a strong cup of coffee, and a passion for clean design.
