CREATE TABLE "operation_log" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"operation_name" varchar(100) NOT NULL,
	"operation_type" varchar(20) NOT NULL,
	"operation_module" varchar(50),
	"operation_desc" text,
	"method" varchar(10) NOT NULL,
	"path" varchar(255) NOT NULL,
	"query" jsonb DEFAULT '{}'::jsonb,
	"params" jsonb DEFAULT '{}'::jsonb,
	"body" jsonb,
	"status" varchar(20) DEFAULT 'PENDING' NOT NULL,
	"response" jsonb,
	"error" jsonb,
	"user_id" uuid,
	"username" varchar(100),
	"user_role" varchar(50),
	"ip" varchar(45),
	"user_agent" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"duration" integer,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "operation_log" ADD CONSTRAINT "operation_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "operation_log_user_id_idx" ON "operation_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "operation_log_operation_type_idx" ON "operation_log" USING btree ("operation_type");--> statement-breakpoint
CREATE INDEX "operation_log_operation_module_idx" ON "operation_log" USING btree ("operation_module");--> statement-breakpoint
CREATE INDEX "operation_log_status_idx" ON "operation_log" USING btree ("status");--> statement-breakpoint
CREATE INDEX "operation_log_created_at_idx" ON "operation_log" USING btree ("created_at");