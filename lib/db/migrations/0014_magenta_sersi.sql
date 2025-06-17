CREATE TABLE "redemption_record" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"code" varchar(255) NOT NULL,
	"type" varchar(32) NOT NULL,
	"reward" jsonb NOT NULL,
	"transaction_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"redeemed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(32) NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar(32) DEFAULT 'completed' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "redeem_batch" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "redeem_code" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "redeem_code_usage" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "redeem_batch" CASCADE;--> statement-breakpoint
DROP TABLE "redeem_code" CASCADE;--> statement-breakpoint
DROP TABLE "redeem_code_usage" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "metadata" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "points" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_id" varchar(128);--> statement-breakpoint
ALTER TABLE "redemption_record" ADD CONSTRAINT "redemption_record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redemption_record" ADD CONSTRAINT "redemption_record_transaction_id_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transaction"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "redemption_user_id_idx" ON "redemption_record" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "redemption_code_idx" ON "redemption_record" USING btree ("code");--> statement-breakpoint
CREATE INDEX "redemption_redeemed_at_idx" ON "redemption_record" USING btree ("redeemed_at");--> statement-breakpoint
CREATE INDEX "transaction_user_id_idx" ON "transaction" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transaction_type_idx" ON "transaction" USING btree ("type");--> statement-breakpoint
CREATE INDEX "transaction_status_idx" ON "transaction" USING btree ("status");--> statement-breakpoint
CREATE INDEX "transaction_created_at_idx" ON "transaction" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_points_idx" ON "user" USING btree ("points");