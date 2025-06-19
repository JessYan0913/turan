ALTER TABLE "transaction" DROP CONSTRAINT "transaction_work_id_work_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "prediction_id" varchar(191);--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_prediction_id_prediction_id_fk" FOREIGN KEY ("prediction_id") REFERENCES "public"."prediction"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN "work_id";