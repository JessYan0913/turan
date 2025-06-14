ALTER TABLE "operation_log" ALTER COLUMN "response" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "operation_log" ALTER COLUMN "error" SET DEFAULT '{}'::jsonb;