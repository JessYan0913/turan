ALTER TABLE "prediction" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "prediction" CASCADE;--> statement-breakpoint
DROP INDEX "work_status_idx";--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "prompt" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "ai_prompt" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
CREATE INDEX "work_completed_at_idx" ON "work" USING btree ("completed_at");--> statement-breakpoint
ALTER TABLE "work" DROP COLUMN "status";