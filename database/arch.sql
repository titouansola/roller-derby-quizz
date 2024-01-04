-- -------------------------------------------------------------
-- TablePlus 5.6.6(520)
--
-- https://tableplus.com/
--
-- Database: verceldb
-- Generation Time: 2024-01-04 12:37:29.9110
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."answers";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."answers" (
    "id" uuid NOT NULL,
    "question_id" uuid NOT NULL,
    "content" text NOT NULL,
    "is_right" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."questions";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."questions" (
    "id" uuid NOT NULL,
    "content" text NOT NULL,
    "reported" bool NOT NULL DEFAULT false,
    "description" text,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."answers" ADD FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE;
