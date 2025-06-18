CREATE TYPE "public"."prediction_status" AS ENUM('starting', 'processing', 'succeeded', 'failed', 'canceled');--> statement-breakpoint
CREATE TABLE "prediction" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"status" "prediction_status" NOT NULL,
	"model" varchar(255) NOT NULL,
	"version" varchar(100) NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb,
	"source" varchar(10) DEFAULT 'api' NOT NULL,
	"error" jsonb,
	"logs" text,
	"metrics" jsonb,
	"webhook" text,
	"webhook_events_filter" jsonb,
	"urls" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "operation_log" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "operation_log" CASCADE;--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "prediction_id" varchar(191);--> statement-breakpoint
CREATE INDEX "prediction_status_idx" ON "prediction" USING btree ("status");--> statement-breakpoint
CREATE INDEX "prediction_created_at_idx" ON "prediction" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "work" ADD CONSTRAINT "work_prediction_id_prediction_id_fk" FOREIGN KEY ("prediction_id") REFERENCES "public"."prediction"("id") ON DELETE set null ON UPDATE no action;