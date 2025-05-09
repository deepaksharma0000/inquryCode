PGDMP                      }            kothari    15.7    16.3 '    '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    436236    kothari    DATABASE     z   CREATE DATABASE kothari WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE kothari;
                postgres    false            �            1259    436252    inquiry_form    TABLE     �  CREATE TABLE public.inquiry_form (
    id bigint NOT NULL,
    name character varying(50),
    gender character varying(50),
    email_id character varying(100),
    mobile_no character varying(50),
    category character varying(50),
    date_of_birth date,
    school_name character varying(255),
    subject character varying(50),
    city character varying(50),
    address character varying(255),
    assigned_to character varying(50),
    status character varying(50) DEFAULT 'inreview'::character varying,
    created_by bigint,
    updated_by bigint,
    deleted_by bigint,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);
     DROP TABLE public.inquiry_form;
       public         heap    postgres    false            �            1259    436251    inquiry_form_id_seq    SEQUENCE     |   CREATE SEQUENCE public.inquiry_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.inquiry_form_id_seq;
       public          postgres    false    219            +           0    0    inquiry_form_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.inquiry_form_id_seq OWNED BY public.inquiry_form.id;
          public          postgres    false    218            �            1259    436238    knex_migrations    TABLE     �   CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
 #   DROP TABLE public.knex_migrations;
       public         heap    postgres    false            �            1259    436237    knex_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.knex_migrations_id_seq;
       public          postgres    false    215            ,           0    0    knex_migrations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
          public          postgres    false    214            �            1259    436245    knex_migrations_lock    TABLE     `   CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);
 (   DROP TABLE public.knex_migrations_lock;
       public         heap    postgres    false            �            1259    436244    knex_migrations_lock_index_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.knex_migrations_lock_index_seq;
       public          postgres    false    217            -           0    0    knex_migrations_lock_index_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;
          public          postgres    false    216            �            1259    436264    roles    TABLE     v   CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(50),
    slug character varying(50)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    436263    roles_id_seq    SEQUENCE     u   CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    221            .           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    220            �            1259    436271    users    TABLE     %  CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(50),
    first_name character varying(50),
    last_name character varying(50),
    mobile_number character varying(50),
    password character varying(255),
    profile_img character varying(255),
    role_id smallint,
    created_by bigint,
    updated_by bigint,
    deleted_by bigint,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    436270    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    223            /           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    222            {           2604    436255    inquiry_form id    DEFAULT     r   ALTER TABLE ONLY public.inquiry_form ALTER COLUMN id SET DEFAULT nextval('public.inquiry_form_id_seq'::regclass);
 >   ALTER TABLE public.inquiry_form ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            y           2604    436241    knex_migrations id    DEFAULT     x   ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
 A   ALTER TABLE public.knex_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            z           2604    436248    knex_migrations_lock index    DEFAULT     �   ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);
 I   ALTER TABLE public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
       public          postgres    false    216    217    217                       2604    436267    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    436274    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223                       0    436252    inquiry_form 
   TABLE DATA           �   COPY public.inquiry_form (id, name, gender, email_id, mobile_no, category, date_of_birth, school_name, subject, city, address, assigned_to, status, created_by, updated_by, deleted_by, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    219   T.                 0    436238    knex_migrations 
   TABLE DATA           J   COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
    public          postgres    false    215   q.                 0    436245    knex_migrations_lock 
   TABLE DATA           @   COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
    public          postgres    false    217   �.       "          0    436264    roles 
   TABLE DATA           /   COPY public.roles (id, name, slug) FROM stdin;
    public          postgres    false    221   
/       $          0    436271    users 
   TABLE DATA           �   COPY public.users (id, username, first_name, last_name, mobile_number, password, profile_img, role_id, created_by, updated_by, deleted_by, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    223   '/       0           0    0    inquiry_form_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.inquiry_form_id_seq', 1, false);
          public          postgres    false    218            1           0    0    knex_migrations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.knex_migrations_id_seq', 3, true);
          public          postgres    false    214            2           0    0    knex_migrations_lock_index_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);
          public          postgres    false    216            3           0    0    roles_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.roles_id_seq', 1, false);
          public          postgres    false    220            4           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    222            �           2606    436262    inquiry_form inquiry_form_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.inquiry_form
    ADD CONSTRAINT inquiry_form_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.inquiry_form DROP CONSTRAINT inquiry_form_pkey;
       public            postgres    false    219            �           2606    436250 .   knex_migrations_lock knex_migrations_lock_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);
 X   ALTER TABLE ONLY public.knex_migrations_lock DROP CONSTRAINT knex_migrations_lock_pkey;
       public            postgres    false    217            �           2606    436243 $   knex_migrations knex_migrations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.knex_migrations DROP CONSTRAINT knex_migrations_pkey;
       public            postgres    false    215            �           2606    436269    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    221            �           2606    436280    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    223                   x������ � �         h   x�3�4202501��O.JM,I���+,�,��O�/ʍ/IL�I��*�4��50�52U04�26 "=SC#mS ��Ü����b���c�/-N-"B�Ԁ=... ��5            x�3�4������ V      "      x������ � �      $   �   x�3�,.-H-JL���CfrZZZX����p�%��8F�[D�'����T�e����D����&{�V�9�&��8Ud8%�q��q�2202�50�52U04�26�21ֳ07040�60�26 � Ə+F��� �.�     