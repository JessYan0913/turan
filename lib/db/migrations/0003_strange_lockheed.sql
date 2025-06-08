ALTER TABLE "Work" RENAME TO "work";--> statement-breakpoint
ALTER TABLE "prediction" DROP CONSTRAINT "prediction_work_id_Work_id_fk";
--> statement-breakpoint
ALTER TABLE "work" DROP CONSTRAINT "Work_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_work_id_work_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."work"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work" ADD CONSTRAINT "work_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;