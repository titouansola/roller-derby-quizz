DROP TABLE IF EXISTS "public"."answers";
CREATE TABLE "public"."answers" (
    "id" uuid NOT NULL,
    "question_id" uuid NOT NULL,
    "content" varchar(512) NOT NULL,
    "is_right" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."questions";
CREATE TABLE "public"."questions" (
    "id" uuid NOT NULL,
    "content" varchar(512) NOT NULL,
    "reported" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."answers" ADD FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE;
