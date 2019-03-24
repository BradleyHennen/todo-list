CREATE TABLE "todo" (
	"id" serial primary key,
	"todo" varchar(140) not null,
	"due" date,
	"status" boolean
);

INSERT INTO "todo" ("todo", "due", "status")
VALUES ('Go to the grocery store', '3/22/2019', false);