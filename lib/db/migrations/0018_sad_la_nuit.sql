ALTER TABLE "prediction" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prediction_user_id_idx" ON "prediction" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "prediction_user_status_idx" ON "prediction" USING btree ("user_id","status");