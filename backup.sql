--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    user_id integer,
    title text,
    ingredients text[],
    content text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipes_id_seq OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    password_hash text NOT NULL,
    created_at date DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, user_id, title, ingredients, content, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, created_at) FROM stdin;
47	zman@gmail.com	$2b$10$qp40Sb0GtWWZetUFZ32hJesDa9K8eylXmn6Ikwn6DMwwSBXOqLUWm	2025-06-27
48	zah00005@mix.wvu.edu	$2b$10$OIafEr6Y3ylWwsjIryNUveJmtN7ghD5LAIStMOShgU3FWlk.hhdxq	2025-06-27
49	randomuser@gmail.com	$2b$10$KGRi75kF74MRS.WnBs3CWOwkLS8PIDtIlTGu78d78mgAFKciWdaSW	2025-06-27
50	zaidhanif200@gmail.com	$2b$10$08r5zz5cEoF4M9xaVfxMzumJdcp5jbREhKo7Je9pWiyIhwDKtB7R.	2025-06-27
52	hkg00001@mix.wvu.edu	$2b$10$5UrroaIMGg1AuaKy7XU/M.szE4x0.ltSFKYB7ojKbcEc.bgdqTI7K	2025-06-27
53	lance.bryson3@gmail.com	$2b$10$kkjx/SjI8RbkJeis0y/sjO8WagR5i9CrHHwKutsAT89tqzRZklryC	2025-06-27
54	shahdhanif02@gmail.com	$2b$10$bhgZzARAEeSMY4giww4FUOD8/ndxZNJRNwUzjW8t.UIshHf995TAq	2025-06-27
62	asdsad@gmail.com	$2b$10$YwmHsdALp3aUQX2BKW0b/ufSrE9TZ3Yjlb7OYZjABu/cgzPJfBAIG	2025-07-03
63	ckwells00@gmail.com	$2b$10$6t9hOdQ5LULnkHxykeQPveb6Vx7gnPEjpgB.nfQgNLp79Qwj7lG9W	2025-07-04
64	alexanderviscomi@gmail.com	$2b$10$KzllCcxUxw0mDp1OVHVeQOmD7.9n4tfnqZm3uuhbEI6sSIeakjm7q	2025-07-05
65	hanifrayyan795@gmail.com	$2b$10$Dzg5OtAVzENP0Vj.wfZnu.UylflFkBh3xa/mKBMgcg7VUeuE9Kmhm	2025-07-09
66	ladanser27@gmail.com	$2b$10$hir2ssqUa4uyHTyT1Osz0e1DjJI.E8LpGxOWVKE2Xu67kVsxK2XnG	2025-07-09
67	camdanser1@gmail.com	$2b$10$ZA2b/At20VK0gw3mbQ9sVO/ei2vAOe01jdm7gmbkOpVjI2weh3V9.	2025-07-09
68	nwimer2@gmail.com	$2b$10$r8Ra/DfLNOsmsSy/QCQFuua7Nf9a2aG8kjInUIyWZ4BfjXr2ztquG	2025-07-09
69	bigrew72@gmail.com	$2b$10$1qL2GQg4oSm12W.tPLSlIOxYBA6QQ6kfWtMEGB/B9IKh2wx4HF6kK	2025-07-11
70	bigrew6969@gmail.com	$2b$10$EzvHtFw.Hdg2Ze4gQzQsye.Ohl5E7tBioTJhm3Al5bzNk0BLGNq2C	2025-07-11
\.


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 70, true);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

