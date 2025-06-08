CREATE TABLE "prediction" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"status" varchar NOT NULL,
	"model" varchar(255) NOT NULL,
	"version" varchar(100) NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb,
	"source" varchar NOT NULL,
	"error" jsonb,
	"logs" text,
	"metrics" jsonb DEFAULT '{}'::jsonb,
	"webhook" text,
	"webhook_events_filter" jsonb,
	"urls" jsonb NOT NULL,
	"work_id" varchar(191),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_work_id_Work_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."Work"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prediction_work_id_idx" ON "prediction" USING btree ("work_id");--> statement-breakpoint
CREATE INDEX "prediction_status_idx" ON "prediction" USING btree ("status");--> statement-breakpoint
CREATE INDEX "prediction_created_at_idx" ON "prediction" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "prediction_model_idx" ON "prediction" USING btree ("model");