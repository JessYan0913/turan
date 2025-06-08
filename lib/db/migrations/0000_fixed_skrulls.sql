CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(256),
	"phone" varchar(20),
	"bio" text,
	"avatar" text,
	"join_date" timestamp DEFAULT now() NOT NULL,
	"plan" varchar(20) DEFAULT 'free',
	"plan_expiry" timestamp,
	"usage_limit" integer DEFAULT 100,
	"usage_current" integer DEFAULT 0,
	"favorite_style" varchar(50),
	"last_active" timestamp,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Work" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar NOT NULL,
	"original_image" text NOT NULL,
	"processed_image" text NOT NULL,
	"style" varchar(100) NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"user_id" uuid NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Work" ADD CONSTRAINT "Work_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_plan_idx" ON "user" USING btree ("plan");--> statement-breakpoint
CREATE INDEX "work_user_id_idx" ON "Work" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "work_type_idx" ON "Work" USING btree ("type");--> statement-breakpoint
CREATE INDEX "work_status_idx" ON "Work" USING btree ("status");--> statement-breakpoint
CREATE INDEX "work_created_at_idx" ON "Work" USING btree ("created_at");