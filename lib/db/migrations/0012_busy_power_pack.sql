CREATE TABLE "redeem_batch" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"channel" varchar(64),
	"note" text,
	"created_by" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "redeem_code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(32) NOT NULL,
	"type" varchar(32) NOT NULL,
	"reward" jsonb NOT NULL,
	"usage_limit" integer DEFAULT 1,
	"used_count" integer DEFAULT 0,
	"expire_at" timestamp,
	"status" varchar(16) DEFAULT 'active' NOT NULL,
	"batch_id" uuid,
	"created_by" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "redeem_code_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "redeem_code_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(32) NOT NULL,
	"user_id" uuid NOT NULL,
	"used_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" varchar(64),
	"user_agent" text,
	"result" varchar(16) NOT NULL,
	"message" text
);
--> statement-breakpoint
ALTER TABLE "redeem_code" ADD CONSTRAINT "redeem_code_batch_id_redeem_batch_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."redeem_batch"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redeem_code_usage" ADD CONSTRAINT "redeem_code_usage_code_redeem_code_code_fk" FOREIGN KEY ("code") REFERENCES "public"."redeem_code"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redeem_code_usage" ADD CONSTRAINT "redeem_code_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "redeem_batch_channel_idx" ON "redeem_batch" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "redeem_batch_created_at_idx" ON "redeem_batch" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "redeem_code_code_idx" ON "redeem_code" USING btree ("code");--> statement-breakpoint
CREATE INDEX "redeem_code_type_idx" ON "redeem_code" USING btree ("type");--> statement-breakpoint
CREATE INDEX "redeem_code_status_idx" ON "redeem_code" USING btree ("status");--> statement-breakpoint
CREATE INDEX "redeem_code_batch_id_idx" ON "redeem_code" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "redeem_code_expire_at_idx" ON "redeem_code" USING btree ("expire_at");--> statement-breakpoint
CREATE INDEX "redeem_code_usage_code_idx" ON "redeem_code_usage" USING btree ("code");--> statement-breakpoint
CREATE INDEX "redeem_code_usage_user_id_idx" ON "redeem_code_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "redeem_code_usage_used_at_idx" ON "redeem_code_usage" USING btree ("used_at");--> statement-breakpoint
CREATE INDEX "redeem_code_usage_result_idx" ON "redeem_code_usage" USING btree ("result");