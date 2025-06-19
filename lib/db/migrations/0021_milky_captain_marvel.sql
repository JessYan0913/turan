ALTER TABLE "user" ADD COLUMN "plan_points" integer DEFAULT 30;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "next_reset_date" timestamp;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "usage_limit";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "usage_current";