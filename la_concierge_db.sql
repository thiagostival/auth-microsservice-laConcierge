--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

-- Started on 2022-08-26 22:18:01

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: laconcierge
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO laconcierge;

--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: laconcierge
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16419)
-- Name: client; Type: TABLE; Schema: public; Owner: laconcierge
--

CREATE TABLE public.client (
    id uuid NOT NULL,
    cpf character varying(11) NOT NULL,
    birth_date timestamp with time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.client OWNER TO laconcierge;

--
-- TOC entry 214 (class 1259 OID 16430)
-- Name: establishment; Type: TABLE; Schema: public; Owner: laconcierge
--

CREATE TABLE public.establishment (
    id uuid NOT NULL,
    cnpj character varying(14) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.establishment OWNER TO laconcierge;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: migrations; Type: TABLE; Schema: public; Owner: laconcierge
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO laconcierge;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: laconcierge
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO laconcierge;

--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: laconcierge
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 211 (class 1259 OID 16394)
-- Name: users; Type: TABLE; Schema: public; Owner: laconcierge
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    tel character varying NOT NULL,
    is_establishment boolean DEFAULT true NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO laconcierge;

--
-- TOC entry 212 (class 1259 OID 16406)
-- Name: users_tokens; Type: TABLE; Schema: public; Owner: laconcierge
--

CREATE TABLE public.users_tokens (
    id uuid NOT NULL,
    refresh_token character varying NOT NULL,
    user_id uuid NOT NULL,
    expires_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users_tokens OWNER TO laconcierge;

--
-- TOC entry 3183 (class 2604 OID 16389)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3348 (class 0 OID 16419)
-- Dependencies: 213
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: laconcierge
--

COPY public.client (id, cpf, birth_date, created_at) FROM stdin;
d29b6883-8524-42f2-b1e3-4df370f01609	12345678901	2022-08-22 00:01:33.351+00	2022-08-22 00:01:33.413417
\.


--
-- TOC entry 3349 (class 0 OID 16430)
-- Dependencies: 214
-- Data for Name: establishment; Type: TABLE DATA; Schema: public; Owner: laconcierge
--

COPY public.establishment (id, cnpj, created_at) FROM stdin;
544d9533-28fa-4b69-ba9d-d8e66059166d	12345678910123	2022-08-22 00:02:22.421981
\.


--
-- TOC entry 3345 (class 0 OID 16386)
-- Dependencies: 210
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: laconcierge
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1661095478318	CreateUsers1661095478318
2	1661111596065	CreateUsersToken1661111596065
3	1661121107589	CreateClient1661121107589
4	1661121147766	CreateEstablishment1661121147766
\.


--
-- TOC entry 3346 (class 0 OID 16394)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: laconcierge
--

COPY public.users (id, name, email, password, tel, is_establishment, is_admin, created_at) FROM stdin;
d29b6883-8524-42f2-b1e3-4df370f01609	thiago	th@example.com	$2b$08$MNNFWOq0wLYyJdfeveIinONYW.iFxQzAhaytb48/qwowyxOVVHPKS	987654321	f	f	2022-08-22 00:01:33.403472
544d9533-28fa-4b69-ba9d-d8e66059166d	Super Rango	rango@example.com	$2b$08$qyopffJqeyW8rShHKUeNT.L89B3hq.IXg6BWn/vcon03qt.xTn3Je	987654321	t	f	2022-08-22 00:02:22.408803
\.


--
-- TOC entry 3347 (class 0 OID 16406)
-- Dependencies: 212
-- Data for Name: users_tokens; Type: TABLE DATA; Schema: public; Owner: laconcierge
--

COPY public.users_tokens (id, refresh_token, user_id, expires_date, created_at) FROM stdin;
0867e139-90c0-4904-96e4-5ac50e579693	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmdvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTI5Njg3LCJleHAiOjE2NjM3MjE2ODcsInN1YiI6IjU0NGQ5NTMzLTI4ZmEtNGI2OS1iYTlkLWQ4ZTY2MDU5MTY2ZCJ9.lhTYqLN4ZHLuwbQsk9YN7fVXQBLpuPT2s9nndH4Px_U	544d9533-28fa-4b69-ba9d-d8e66059166d	2022-09-21 00:54:47.261	2022-08-22 00:54:47.262771
e4587e74-1dc6-4573-97d7-f9870e658d35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmdvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTI5NzA0LCJleHAiOjE2NjM3MjE3MDQsInN1YiI6IjU0NGQ5NTMzLTI4ZmEtNGI2OS1iYTlkLWQ4ZTY2MDU5MTY2ZCJ9.Ldz6NMuHEKuhGT8mhBH0fyzqTpwfO_qho6xw_hzGtfw	544d9533-28fa-4b69-ba9d-d8e66059166d	2022-09-21 00:55:04.934	2022-08-22 00:55:04.935597
1ada9cbc-559d-4eed-89c2-a91b1f1cc941	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmdvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTI5NzIwLCJleHAiOjE2NjM3MjE3MjAsInN1YiI6IjU0NGQ5NTMzLTI4ZmEtNGI2OS1iYTlkLWQ4ZTY2MDU5MTY2ZCJ9.tFKzUTVv1ZGVvz_MhiYKULZObOqDaCqPpWeymQi20Fs	544d9533-28fa-4b69-ba9d-d8e66059166d	2022-09-21 00:55:20.977	2022-08-22 00:55:20.978866
806dd17e-ab27-40ee-9c24-ca50270bd828	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTMwNjQyLCJleHAiOjE2NjM3MjI2NDIsInN1YiI6ImQyOWI2ODgzLTg1MjQtNDJmMi1iMWUzLTRkZjM3MGYwMTYwOSJ9.57KMm_urCTRmb817FIWuoX-47i9IvJQ5GBwWNx25m-8	d29b6883-8524-42f2-b1e3-4df370f01609	2022-09-21 01:10:42.807	2022-08-22 01:10:42.811334
f9740eb8-9acd-4647-ae1b-98c09b5a1197	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmdvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTMwODE1LCJleHAiOjE2NjM3MjI4MTUsInN1YiI6IjU0NGQ5NTMzLTI4ZmEtNGI2OS1iYTlkLWQ4ZTY2MDU5MTY2ZCJ9.6e9xLvq0s9UdHDn7Dxk8TsWqNnsJHPTcIH5Xapr5bHc	544d9533-28fa-4b69-ba9d-d8e66059166d	2022-09-21 01:13:35.658	2022-08-22 01:13:35.661949
3c66c39d-a6b0-40d0-ba32-c08838548a17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTMwODIzLCJleHAiOjE2NjM3MjI4MjMsInN1YiI6ImQyOWI2ODgzLTg1MjQtNDJmMi1iMWUzLTRkZjM3MGYwMTYwOSJ9.WbQCSvGmd9t_FNL_VHj77Rw_y_1EMUpI0uE-mDc-LMM	d29b6883-8524-42f2-b1e3-4df370f01609	2022-09-21 01:13:43.673	2022-08-22 01:13:43.674915
823ed097-692e-463c-974b-fdb520ad978e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTMxNzM0LCJleHAiOjE2NjM3MjM3MzQsInN1YiI6ImQyOWI2ODgzLTg1MjQtNDJmMi1iMWUzLTRkZjM3MGYwMTYwOSJ9.zAQau23362jyq-5nnBjf_dWm0kGLb_UHVy_XnqzU5-o	d29b6883-8524-42f2-b1e3-4df370f01609	2022-09-21 01:28:54.462	2022-08-22 01:28:54.466039
7cbc0ebc-ae12-47c8-815a-6ff07c6efee8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNjYxMTMyODUzLCJleHAiOjE2NjM3MjQ4NTMsInN1YiI6ImQyOWI2ODgzLTg1MjQtNDJmMi1iMWUzLTRkZjM3MGYwMTYwOSJ9.bO9IO3khJSVRxzUT72YF_BzzF5wpRTCVwfjPnTKpbcA	d29b6883-8524-42f2-b1e3-4df370f01609	2022-09-21 01:47:33.361	2022-08-22 01:47:33.364623
\.


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: laconcierge
--

SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);


--
-- TOC entry 3201 (class 2606 OID 16435)
-- Name: establishment PK_149bd9dc1f2bd4e825a0c474932; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.establishment
    ADD CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16393)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 16424)
-- Name: client PK_96da49381769303a6515a8785c7; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16413)
-- Name: users_tokens PK_9f236389174a6ccbd746f53dca8; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16403)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 16405)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 3203 (class 2606 OID 16425)
-- Name: client ClientUser; Type: FK CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "ClientUser" FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3204 (class 2606 OID 16436)
-- Name: establishment EstablishmentUser; Type: FK CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.establishment
    ADD CONSTRAINT "EstablishmentUser" FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3202 (class 2606 OID 16414)
-- Name: users_tokens FKUserToken; Type: FK CONSTRAINT; Schema: public; Owner: laconcierge
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT "FKUserToken" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-08-26 22:18:01

--
-- PostgreSQL database dump complete
--

