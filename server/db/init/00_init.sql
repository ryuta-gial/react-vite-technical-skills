-- Started on 2021-04-01 16:00:00 JST
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET TIMEZONE = 'Asia/Tokyo';
--
CREATE USER admin WITH PASSWORD 'qNcy&uLf!2n^4##a';
CREATE DATABASE "shift-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
ALTER DATABASE "shift-db" OWNER TO root;
\connect -reuse-previous=on "dbname='shift-db'"
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;
-- bigint	8バイト	広範囲整数
-- integer	4バイト	通常使用する整数
CREATE TABLE public."Staff" (
    id serial,
    name character varying NOT NULL,
    employment_status character varying(8) NOT NULL,
    shift_type character varying NOT NULL,
    is_deleted boolean  NOT NULL DEFAULT FALSE,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);
CREATE TABLE public."ShiftType" (
    id serial,
    name character varying NOT NULL,
    start_time character varying NOT NULL,
    end_time character varying NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);
CREATE TABLE public."EmploymentStatus" (
    id integer NOT NULL,
    name character varying NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);
CREATE TABLE public."Holiday" (
    id character varying NOT NULL,
    title character varying NOT NULL,
    holiday date ,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);
CREATE TABLE public."HopeHoliday" (
    id integer NOT NULL,
    staff_id integer NOT NULL,
    hope_holiday date ,
    staff_hope_holiday character varying NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);

CREATE TABLE public."RequiredNumberOfPeople" (
    id integer NOT NULL,
    work_date date,
    number_of_people jsonb,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);

CREATE TABLE public."Shift" (
    id integer NOT NULL,
    staff_id integer NOT NULL,
    workking_day timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    UNIQUE(id)
);
ALTER TABLE public."Staff" OWNER TO root;
ALTER TABLE public."ShiftType" OWNER TO root;
ALTER TABLE public."EmploymentStatus" OWNER TO root;
ALTER TABLE public."Holiday" OWNER TO root;
ALTER TABLE public."HopeHoliday" OWNER TO root;
ALTER TABLE public."Shift" OWNER TO root;
ALTER TABLE public."RequiredNumberOfPeople" OWNER TO root;

-- CREATE SEQUENCE -- 新しいシーケンスジェネレータを定義する
-- START WITH start句を使用すると、任意の数からシーケンス番号を開始することができます。この句は省略可能です。 デフォルトでは、シーケンス番号が始まる値は、昇順の場合minvalue、降順の場合maxvalueになります。
-- https://www.postgresql.jp/document/9.4/html/sql-createsequence.html
CREATE SEQUENCE public."EmploymentStatus_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public."HopeHoliday_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public."Shift_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public."RequiredNumberOfPeople_id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;


ALTER TABLE public."EmploymentStatus_id_seq" OWNER TO root;
ALTER TABLE public."HopeHoliday_id_seq" OWNER TO root;
ALTER TABLE public."Shift_id_seq" OWNER TO root;
ALTER TABLE public."RequiredNumberOfPeople_id_seq" OWNER TO root;
--PUBLICキーワードは、今後作成されるロールを含む、全てのロールへの許可を示します。 PUBLICは、全てのロールを常に含む、暗黙的に定義されたグループと考えることができます。 個々のロールは全て、ロールに直接許可された権限、ロールが現在属しているロールに許可された権限、そして、PUBLICに許可された権限を合わせた権限を持っています。
-- ALTER SEQUENCEは、シーケンス(順序)を変更するSQL文です。順序の初期値、増分値、最大値、最小値、および順序のサイクルを変更できます。
-- OWNED BYオプションにより、シーケンスは指定されたテーブル列に関連付けされ、その列（やテーブル全体）が削除されると、自動的にシーケンスも同様に削除されるようになります。 指定があると、以前に指定されたシーケンスの関連は、指定された関連に置き換えられます。 指定するテーブルは、シーケンスと同一所有者でなければならず、また、同一のスキーマ内に存在しなければなりません。 OWNED BY NONEを指定することで、既存の関連は削除され、シーケンスは"独立"したものになります。
ALTER SEQUENCE public."EmploymentStatus_id_seq" OWNED BY public."EmploymentStatus".id;
ALTER SEQUENCE public."HopeHoliday_id_seq" OWNED BY public."HopeHoliday".id;
ALTER SEQUENCE public."Shift_id_seq" OWNED BY public."Shift".id;
ALTER SEQUENCE public."RequiredNumberOfPeople_id_seq" OWNED BY public."RequiredNumberOfPeople".id;
--テーブル名の前にONLYが指定された場合、そのテーブルのみが変更されます。
-- 既存カラムのシリアル型への変更

ALTER TABLE ONLY public."EmploymentStatus"
ALTER COLUMN id
SET DEFAULT nextval('public."EmploymentStatus_id_seq"'::regclass);

ALTER TABLE ONLY public."HopeHoliday"
ALTER COLUMN id
SET DEFAULT nextval('public."HopeHoliday_id_seq"'::regclass);

ALTER TABLE ONLY public."Shift"
ALTER COLUMN id
SET DEFAULT nextval('public."Shift_id_seq"'::regclass);

ALTER TABLE ONLY public."RequiredNumberOfPeople"
ALTER COLUMN id
SET DEFAULT nextval('public."RequiredNumberOfPeople_id_seq"'::regclass);

--ALTER TABLE～ADD CONSTRAINTを使ってテーブルの列aとbに主キー制約を追加します。
--書き方：ALTER TABLE テーブル名 ADD CONSTRAINT 主キー名 PRIMARY KEY(列名);

ALTER TABLE ONLY public."EmploymentStatus"
ADD CONSTRAINT "EmploymentStatus_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."HopeHoliday"
ADD CONSTRAINT "HopeHoliday_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Shift"
ADD CONSTRAINT "Shift_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."RequiredNumberOfPeople"
ADD CONSTRAINT "RequiredNumberOfPeople_pkey" PRIMARY KEY (id);
-- Case
--カラムに対して FOREIGN KEY 制約(外部キー制約)を設定すると、カラムに格納できる値を別に用意したテーブルの指定のカラムに格納されている値に限定することができます。書式は次の通りです。REFERENCESは参照するテーブル名
ALTER TABLE ONLY public."HopeHoliday"
ADD CONSTRAINT "Staff_fk_reqHosp_id" FOREIGN KEY (staff_id) REFERENCES public."Staff" (id);

--ユーザーに対して権限を設定するには GRANT 文を使用します。
-- ALL PRIVILEGES 利用可能な全ての権限を一度に付与します。 PRIVILEGESキーワードはPostgreSQLでは省略可能ですが、厳密なSQLでは必須です。
-- to rolo名
-- PostgreSQL 7.3以降では、「スキーマ」という分割されたネームスペースが導入されました。DBを作成するとスキーマ「public」がデフォルトで作成されます。このスキーマは全てのユーザーが参照できます。publicに作成したオブジェクト（テーブルや関数、演算子など）を使用するなども可能です。
GRANT ALL PRIVILEGES ON DATABASE "shift-db" TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
