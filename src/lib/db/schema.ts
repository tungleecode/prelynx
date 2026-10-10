import {
  mysqlTable,
  varchar,
  text,
  int,
  float,
  boolean,
  datetime,
  json,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("User", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  emailVerified: datetime("emailVerified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 50 }).default("USER").notNull(),
  
  targetBand: float("targetBand"),
  currentBand: float("currentBand"),
  examDate: datetime("examDate", { mode: "date", fsp: 3 }),
  dailyGoal: int("dailyGoal"),
  streak: int("streak").default(0).notNull(),
  gems: int("gems").default(0).notNull(),
  lastStudyDate: datetime("lastStudyDate", { mode: "date", fsp: 3 }),
}, (table) => ({
  emailIdx: uniqueIndex("email").on(table.email),
}));

export const accounts = mysqlTable("Account", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: int("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  id_token: text("id_token"),
  session_state: varchar("session_state", { length: 255 }),
}, (table) => ({
  providerProviderAccountIdIdx: uniqueIndex("provider_providerAccountId").on(table.provider, table.providerAccountId),
}));

export const sessions = mysqlTable("Session", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: datetime("expires", { mode: "date", fsp: 3 }).notNull(),
}, (table) => ({
  sessionTokenIdx: uniqueIndex("sessionToken").on(table.sessionToken),
}));

export const verificationTokens = mysqlTable("VerificationToken", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: datetime("expires", { mode: "date", fsp: 3 }).notNull(),
}, (table) => ({
  identifierTokenIdx: uniqueIndex("identifier_token").on(table.identifier, table.token),
  tokenIdx: uniqueIndex("token").on(table.token),
}));

export const lessons = mysqlTable("Lesson", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  type: varchar("type", { length: 255 }).notNull(),
  data: json("data").notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});

export const userProgresses = mysqlTable("UserProgress", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId", { length: 255 }).notNull(),
  lessonId: varchar("lessonId", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  score: float("score"),
  answers: json("answers"),
  isFav: boolean("isFav").default(false).notNull(),
  lastSeen: datetime("lastSeen", { mode: "date", fsp: 3 }).notNull(),
}, (table) => ({
  userIdLessonIdIdx: uniqueIndex("userId_lessonId").on(table.userId, table.lessonId),
}));

export const essaySubmissions = mysqlTable("EssaySubmission", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId", { length: 255 }).notNull(),
  lessonId: varchar("lessonId", { length: 255 }).notNull(),
  content: text("content").notNull(),
  wordCount: int("wordCount").default(0).notNull(),
  score: float("score"),
  feedback: json("feedback"),
  submittedAt: datetime("submittedAt", { mode: "date", fsp: 3 }).notNull(),
});

export const flashcardReviews = mysqlTable("FlashcardReview", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId", { length: 255 }).notNull(),
  word: varchar("word", { length: 255 }).notNull(),
  interval: int("interval").default(0).notNull(),
  repetition: int("repetition").default(0).notNull(),
  efactor: float("efactor").default(2.5).notNull(),
  dueDate: datetime("dueDate", { mode: "date", fsp: 3 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
}, (table) => ({
  userIdWordIdx: uniqueIndex("userId_word").on(table.userId, table.word),
}));

export const vocabDecks = mysqlTable("VocabDeck", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }), // e.g., 'ielts', 'sat'
  description: text("description"),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
});

export const vocabCards = mysqlTable("VocabCard", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  deckId: varchar("deckId", { length: 255 }).notNull(),
  word: varchar("word", { length: 255 }).notNull(),
  meaning: text("meaning").notNull(),
  example: text("example"),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
});

import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  essays: many(essaySubmissions),
  progress: many(userProgresses),
  flashcards: many(flashcardReviews),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const essaySubmissionsRelations = relations(essaySubmissions, ({ one }) => ({
  user: one(users, { fields: [essaySubmissions.userId], references: [users.id] }),
  lesson: one(lessons, { fields: [essaySubmissions.lessonId], references: [lessons.id] }),
}));

export const userProgressesRelations = relations(userProgresses, ({ one }) => ({
  user: one(users, { fields: [userProgresses.userId], references: [users.id] }),
  lesson: one(lessons, { fields: [userProgresses.lessonId], references: [lessons.id] }),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  essays: many(essaySubmissions),
  progress: many(userProgresses),
}));

export const flashcardReviewsRelations = relations(flashcardReviews, ({ one }) => ({
  user: one(users, { fields: [flashcardReviews.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const vocabDecksRelations = relations(vocabDecks, ({ many }) => ({
  cards: many(vocabCards),
}));

export const vocabCardsRelations = relations(vocabCards, ({ one }) => ({
  deck: one(vocabDecks, { fields: [vocabCards.deckId], references: [vocabDecks.id] }),
}));
