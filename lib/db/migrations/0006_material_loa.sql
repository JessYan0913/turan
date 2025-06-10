ALTER TABLE "work" ALTER COLUMN "original_image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "work" ALTER COLUMN "original_image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ALTER COLUMN "processed_image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "work" ALTER COLUMN "processed_image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ALTER COLUMN "style" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "work" ALTER COLUMN "style" DROP NOT NULL;