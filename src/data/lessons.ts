export interface CodeSection {
  type: 'comparison';
  heading?: string;
  body?: string;
  djangoLabel?: string;
  springBootLabel?: string;
  django: string;
  springBoot: string;
  djangoLang?: string;
  springBootLang?: string;
}

export interface TextSection {
  type: 'text';
  heading?: string;
  body: string;
}

export interface CalloutSection {
  type: 'callout';
  variant: 'info' | 'tip' | 'warning' | 'key';
  title: string;
  body: string;
}

export interface SingleCodeSection {
  type: 'code';
  heading?: string;
  body?: string;
  label?: string;
  language: string;
  code: string;
}

export type Section = CodeSection | TextSection | CalloutSection | SingleCodeSection;

export interface Lesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  sections: Section[];
}

export const lessons: Lesson[] = [
  {
    id: 'intro',
    number: 1,
    title: 'Introduction & Philosophy',
    subtitle: 'How Spring Boot thinks differently from Django',
    sections: [
      {
        type: 'text',
        heading: 'Welcome',
        body: 'You already know how to build web apps. You know Django — models, views, URLs, serializers, migrations. This tutorial maps everything you know to Kotlin Spring Boot. Every concept has a counterpart; the names and shapes just differ.',
      },
      {
        type: 'callout',
        variant: 'key',
        title: 'The Core Difference',
        body: 'Django is a monolithic, batteries-included framework — one way to do things, built-in ORM, built-in admin, built-in auth. Spring Boot is an opinionated assembly of Spring Framework components. It is more flexible and explicit, but that means more moving parts to understand up front.',
      },
      {
        type: 'text',
        heading: 'Philosophy Comparison',
        body: 'Django follows "convention over configuration" for Python. Spring Boot does the same for the JVM but with stronger types, dependency injection as a first-class citizen, and an annotation-driven style.',
      },
      {
        type: 'comparison',
        heading: 'Mental Model Map',
        django: `# Django Mental Model
# ---------------------
# settings.py         → application.yml
# models.py           → @Entity classes
# views.py            → @RestController classes
# urls.py             → @RequestMapping annotations
# serializers.py      → DTO data classes + Jackson
# migrations/         → Flyway SQL files (or JPA auto-ddl)
# manage.py           → Gradle tasks (./gradlew bootRun)
# requirements.txt    → build.gradle.kts dependencies
# virtualenv          → Gradle wrapper (no venv needed)
# pytest              → JUnit 5 + Mockito
# django.contrib.auth → Spring Security`,
        springBoot: `// Spring Boot Mental Model
// -------------------------
// application.yml         ← settings.py
// @Entity class           ← models.py
// @RestController class   ← views.py
// @RequestMapping / @GetMapping etc ← urls.py
// DTO data class + Jackson ← serializers.py
// Flyway SQL migrations   ← migrations/
// ./gradlew bootRun       ← python manage.py runserver
// build.gradle.kts        ← requirements.txt
// Spring Security         ← django.contrib.auth
// JUnit 5 + Mockito       ← pytest`,
        djangoLabel: 'Python / Django',
        springBootLabel: 'Kotlin / Spring Boot',
      },
      {
        type: 'text',
        heading: 'Key Language Shift: Kotlin',
        body: 'The backend code is written in Kotlin, not Java. Kotlin compiles to JVM bytecode, so it runs on the same JVM and can use all Java/Spring libraries. But Kotlin has null-safety, data classes, extension functions, and concise syntax — you will find it far more pleasant than Java. Think of it as a statically-typed Python with some Scala ideas mixed in.',
      },
      {
        type: 'comparison',
        heading: 'Kotlin vs Python — A Quick Taste',
        body: 'Here is the same data model definition in both languages:',
        django: `# Python / Django
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`,
        springBoot: `// Kotlin / Spring Boot (JPA Entity)
import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "articles")
data class Article(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String,
    val content: String,
    val published: Boolean = false,
    val createdAt: Instant = Instant.now()
)`,
        djangoLabel: 'Python Django model',
        springBootLabel: 'Kotlin JPA Entity',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Null Safety — A Big Win Over Java',
        body: 'In Kotlin, String means it can NEVER be null. String? means it might be null. The compiler enforces this — no more NullPointerExceptions sneaking through. This is like Python type hints, but actually enforced at compile time.',
      },
    ],
  },

  {
    id: 'project-setup',
    number: 2,
    title: 'Project Setup',
    subtitle: 'Gradle, project structure, and your first run',
    sections: [
      {
        type: 'text',
        heading: 'Creating a Spring Boot Project',
        body: 'The easiest way is start.spring.io — the official project generator (like django-admin startproject but with a web UI). Select: Gradle - Kotlin, Language: Kotlin, Spring Boot version (latest stable), and add dependencies: Spring Web, Spring Data JPA, PostgreSQL Driver.',
      },
      {
        type: 'comparison',
        heading: 'Project Structure',
        django: `myproject/
├── manage.py
├── requirements.txt
├── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── articles/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── migrations/`,
        springBoot: `myproject/
├── gradlew          ← like manage.py / venv activation
├── build.gradle.kts ← like requirements.txt
├── src/
│   ├── main/
│   │   ├── kotlin/com/example/myproject/
│   │   │   ├── MyprojectApplication.kt  ← entry point
│   │   │   ├── article/
│   │   │   │   ├── Article.kt           ← model
│   │   │   │   ├── ArticleRepository.kt ← ORM layer
│   │   │   │   ├── ArticleService.kt    ← business logic
│   │   │   │   └── ArticleController.kt ← views/URLs
│   │   └── resources/
│   │       ├── application.yml          ← settings.py
│   │       └── db/migration/            ← migrations/
│   └── test/kotlin/...`,
        djangoLabel: 'Django project layout',
        springBootLabel: 'Spring Boot project layout',
      },
      {
        type: 'comparison',
        heading: 'Dependency Management',
        body: 'Spring Boot uses Gradle (or Maven) instead of pip. The build.gradle.kts file is your requirements.txt plus your build script combined.',
        django: `# requirements.txt
Django==4.2.0
djangorestframework==3.14.0
psycopg2-binary==2.9.6
pytest-django==4.5.2
python-decouple==3.8

# Install with:
pip install -r requirements.txt

# Run dev server:
python manage.py runserver`,
        springBoot: `// build.gradle.kts
plugins {
    kotlin("jvm") version "1.9.0"
    kotlin("plugin.spring") version "1.9.0"
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

// Run dev server:
// ./gradlew bootRun`,
        djangoLabel: 'requirements.txt + pip',
        springBootLabel: 'build.gradle.kts + Gradle',
      },
      {
        type: 'comparison',
        heading: 'Application Entry Point',
        django: `# manage.py is auto-generated.
# Your settings module does the init.

# wsgi.py / asgi.py
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'myproject.settings')
application = get_wsgi_application()`,
        springBoot: `// MyprojectApplication.kt
package com.example.myproject

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication  // enables auto-configuration
fun main(args: Array<String>) {
    runApplication<MyprojectApplication>(*args)
}`,
        djangoLabel: 'Django entry point',
        springBootLabel: 'Spring Boot entry point',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Gradle Wrapper = No Global Install Needed',
        body: './gradlew is a self-contained Gradle wrapper committed to the repo. Anyone who clones the project can run ./gradlew bootRun without installing Gradle globally — similar in spirit to a committed virtual environment.',
      },
    ],
  },

  {
    id: 'first-endpoint',
    number: 3,
    title: 'Your First REST Endpoint',
    subtitle: '@RestController, routing, and request/response',
    sections: [
      {
        type: 'text',
        heading: 'From Views + URLs to Controllers',
        body: 'In Django you have two files: views.py (the handler logic) and urls.py (the routing). In Spring Boot, these are combined into a single @RestController class using method-level annotations for routing. No separate URL file.',
      },
      {
        type: 'comparison',
        heading: 'A Simple GET Endpoint',
        django: `# articles/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello, World!"})

# articles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello),
]

# myproject/urls.py
from django.urls import include, path

urlpatterns = [
    path('api/', include('articles.urls')),
]`,
        springBoot: `// ArticleController.kt
package com.example.myproject.article

import org.springframework.web.bind.annotation.*

@RestController          // marks class as a REST controller
@RequestMapping("/api")  // base path for all methods
class ArticleController {

    @GetMapping("/hello")   // handles GET /api/hello
    fun hello(): Map<String, String> {
        return mapOf("message" to "Hello, World!")
    }
}

// That's it — no separate URL file needed.
// Spring scans for @RestController classes automatically.`,
        djangoLabel: 'Django REST Framework',
        springBootLabel: 'Spring Boot REST Controller',
      },
      {
        type: 'comparison',
        heading: 'Path Parameters',
        django: `# urls.py
path('articles/<int:pk>/', views.article_detail),

# views.py
@api_view(['GET'])
def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)`,
        springBoot: `@GetMapping("/articles/{id}")
fun getArticle(@PathVariable id: Long): ArticleDto {
    return articleService.findById(id)
    // throws 404 automatically if not found
    // (we'll wire that up in the Service lesson)
}`,
        djangoLabel: 'Django URL + view',
        springBootLabel: 'Spring Boot path variable',
      },
      {
        type: 'comparison',
        heading: 'Query Parameters',
        django: `@api_view(['GET'])
def list_articles(request):
    published = request.query_params.get(
        'published', None
    )
    # e.g. GET /api/articles/?published=true`,
        springBoot: `@GetMapping("/articles")
fun listArticles(
    @RequestParam(required = false) published: Boolean?
): List<ArticleDto> {
    // e.g. GET /api/articles?published=true
    return articleService.findAll(published)
}`,
        djangoLabel: 'Django query params',
        springBootLabel: 'Spring Boot @RequestParam',
      },
      {
        type: 'comparison',
        heading: 'POST with Request Body',
        django: `@api_view(['POST'])
def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        article = serializer.save()
        return Response(
            ArticleSerializer(article).data,
            status=201
        )
    return Response(serializer.errors, status=400)`,
        springBoot: `@PostMapping("/articles")
@ResponseStatus(HttpStatus.CREATED)
fun createArticle(
    @RequestBody @Valid request: CreateArticleRequest
): ArticleDto {
    return articleService.create(request)
    // Jackson auto-deserializes JSON to CreateArticleRequest
    // @Valid triggers Bean Validation (like DRF validators)
}`,
        djangoLabel: 'Django POST handler',
        springBootLabel: 'Spring Boot POST handler',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'HTTP Method Annotations',
        body: '@GetMapping, @PostMapping, @PutMapping, @PatchMapping, @DeleteMapping — these are shorthand for @RequestMapping(method = [GET|POST|...]). Use them on individual methods inside your @RestController class.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Return Types = Automatic JSON',
        body: 'In Django you return Response(data). In Spring Boot, whatever you return from a controller method is automatically serialized to JSON by Jackson. Return a data class, a Map, a List — Jackson handles it. No extra serializer code needed for simple cases.',
      },
    ],
  },

  {
    id: 'models-entities',
    number: 4,
    title: 'Models & Entities',
    subtitle: 'From Django models to JPA @Entity',
    sections: [
      {
        type: 'text',
        heading: 'Django Model vs JPA Entity',
        body: 'Django models define the table schema AND provide the ORM interface. In Spring Boot, these are separated: the @Entity class maps to a table, and a separate Repository class provides the query API. This is the Repository pattern.',
      },
      {
        type: 'comparison',
        heading: 'Defining a Model / Entity',
        django: `# articles/models.py
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'articles'
        ordering = ['-created_at']

    def __str__(self):
        return self.title`,
        springBoot: `// Article.kt
import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "articles")
data class Article(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 200)
    val title: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    val content: String,

    val published: Boolean = false,

    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
)`,
        djangoLabel: 'Django model',
        springBootLabel: 'JPA Entity (Kotlin data class)',
      },
      {
        type: 'comparison',
        heading: 'Field Type Mapping',
        django: `# Django field  →  JPA / SQL equivalent

models.AutoField()        # @Id @GeneratedValue
models.CharField(max_length=200)  # String + @Column(length=200)
models.TextField()        # String + @Column(columnDefinition="TEXT")
models.IntegerField()     # Int
models.BigIntegerField()  # Long
models.FloatField()       # Double
models.DecimalField()     # BigDecimal
models.BooleanField()     # Boolean
models.DateTimeField()    # Instant or LocalDateTime
models.DateField()        # LocalDate
models.JSONField()        # @Column(columnDefinition="jsonb")
models.ForeignKey()       # @ManyToOne
models.ManyToManyField()  # @ManyToMany`,
        springBoot: `// JPA field  →  Django equivalent

@Id @GeneratedValue        // models.AutoField()
String (length=200)        // models.CharField(max_length=200)
String (TEXT column)       // models.TextField()
Int                        // models.IntegerField()
Long                       // models.BigIntegerField()
Double                     // models.FloatField()
BigDecimal                 // models.DecimalField()
Boolean                    // models.BooleanField()
Instant / LocalDateTime    // models.DateTimeField()
LocalDate                  // models.DateField()
@Column(jsonb)             // models.JSONField()
@ManyToOne                 // models.ForeignKey()
@ManyToMany                // models.ManyToManyField()`,
        djangoLabel: 'Django field types',
        springBootLabel: 'JPA / Kotlin equivalents',
      },
      {
        type: 'comparison',
        heading: 'Relationships',
        body: 'ForeignKey in Django becomes @ManyToOne in JPA:',
        django: `class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.ManyToManyField(Tag,
                                   blank=True)
    author = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        related_name='articles'
    )`,
        springBoot: `@Entity
data class Tag(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(unique = true)
    val name: String
)

@Entity
data class Article(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String,
    val content: String,

    @ManyToMany
    @JoinTable(name = "article_tags")
    val tags: MutableSet<Tag> = mutableSetOf(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    val author: User
)`,
        djangoLabel: 'Django relationships',
        springBootLabel: 'JPA relationships',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'FetchType.LAZY vs EAGER — The N+1 Problem',
        body: 'By default, JPA may eagerly load related entities, causing the N+1 query problem. Always use FetchType.LAZY on @ManyToOne and @OneToMany unless you have a specific reason, and use @EntityGraph or JOIN FETCH when you need the related data.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'data class — Kotlin\'s Django Model __str__ Equivalent',
        body: 'Kotlin data classes automatically generate equals(), hashCode(), toString(), and copy() methods. For JPA entities, be careful: avoid using data class with mutable collections in equals/hashCode — consider using @EqualsAndHashCode on the id field only, or use a regular class with manual implementations for complex entities.',
      },
    ],
  },

  {
    id: 'migrations',
    number: 5,
    title: 'Database Migrations',
    subtitle: 'From Django migrate to Flyway SQL files',
    sections: [
      {
        type: 'text',
        heading: 'How Migrations Work Differently',
        body: 'Django auto-generates migration files from your model changes. Spring Boot with JPA has several options: auto-DDL (good for dev only), Flyway (recommended for production), or Liquibase. Flyway is the most Django-like — it runs versioned SQL files in order.',
      },
      {
        type: 'comparison',
        heading: 'Creating a Migration',
        django: `# 1. Change your model
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    # Added new field:
    slug = models.SlugField(unique=True, blank=True)

# 2. Auto-generate migration
python manage.py makemigrations

# Django generates:
# articles/migrations/0002_article_slug.py

# 3. Apply migration
python manage.py migrate`,
        springBoot: `-- Flyway: create file manually
-- src/main/resources/db/migration/V2__add_slug_to_articles.sql

ALTER TABLE articles
    ADD COLUMN slug VARCHAR(255) UNIQUE;

-- Naming convention: V{version}__{description}.sql
-- V1__create_articles.sql
-- V2__add_slug_to_articles.sql
-- V3__add_tags_table.sql

-- Flyway runs these automatically on app startup
-- in order, tracking applied versions in
-- the "flyway_schema_history" table.`,
        djangoLabel: 'Django auto-generated migration',
        springBootLabel: 'Flyway versioned SQL migration',
      },
      {
        type: 'comparison',
        heading: 'Initial Table Creation Migration',
        django: `# Django auto-generates this from your model.
# You rarely write raw SQL.
# 0001_initial.py:

operations = [
    migrations.CreateModel(
        name='Article',
        fields=[
            ('id', models.AutoField(primary_key=True)),
            ('title', models.CharField(max_length=200)),
            ('content', models.TextField()),
            ('published', models.BooleanField(default=False)),
            ('created_at', models.DateTimeField(
                auto_now_add=True)),
        ],
    ),
]`,
        springBoot: `-- V1__create_articles_table.sql
-- You write the SQL yourself (more control)

CREATE TABLE articles (
    id         BIGSERIAL PRIMARY KEY,
    title      VARCHAR(200) NOT NULL,
    content    TEXT         NOT NULL,
    published  BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Add an index (explicit in Spring Boot)
CREATE INDEX idx_articles_published
    ON articles (published);`,
        djangoLabel: 'Django auto-generated DDL',
        springBootLabel: 'Flyway handwritten SQL',
      },
      {
        type: 'comparison',
        heading: 'Configuration',
        django: `# settings.py - Django migration config
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
    }
}

# Run:
# python manage.py migrate
# python manage.py showmigrations
# python manage.py sqlmigrate articles 0001`,
        springBoot: `# application.yml - Flyway config
spring:
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true

  jpa:
    hibernate:
      ddl-auto: validate  # verify schema matches entities
      # Options: none, validate, update, create, create-drop
      # Use "validate" in production with Flyway
      # Use "create-drop" in tests`,
        djangoLabel: 'Django migration settings',
        springBootLabel: 'Spring Boot Flyway config',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Dev Shortcut: ddl-auto=update',
        body: 'During early development, you can set spring.jpa.hibernate.ddl-auto=update and skip Flyway entirely. Hibernate will auto-create/alter tables to match your entities. Never use this in production — use validate + Flyway instead.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'No makemigrations — You Write the SQL',
        body: 'This is the biggest Django-to-Spring shift in migrations. Spring Boot does not auto-generate SQL from entity changes. You write the SQL files manually. This feels like more work but gives you complete control over exactly what SQL runs in production.',
      },
    ],
  },

  {
    id: 'repositories',
    number: 6,
    title: 'Repositories & ORM',
    subtitle: 'JpaRepository vs Django Manager / QuerySet',
    sections: [
      {
        type: 'text',
        heading: 'Django Manager vs Spring Data Repository',
        body: 'In Django, Article.objects is the Manager — it gives you all(), filter(), get(), create(), etc. In Spring Boot, you define a Repository interface that extends JpaRepository, and Spring Data automatically implements it for you at runtime. No implementation code needed for standard queries.',
      },
      {
        type: 'comparison',
        heading: 'Defining a Repository',
        django: `# Django: no definition needed
# Article.objects is auto-created by Django ORM

# You can customize the Manager:
class ArticleManager(models.Manager):
    def published(self):
        return self.filter(published=True)

class Article(models.Model):
    objects = ArticleManager()
    # ...`,
        springBoot: `// ArticleRepository.kt
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : JpaRepository<Article, Long> {
    // JpaRepository<EntityType, IdType>
    // Spring Data implements this interface automatically!
    // You get: findAll(), findById(), save(), delete()...
    // for FREE — no implementation code needed.
}`,
        djangoLabel: 'Django Manager',
        springBootLabel: 'Spring Data JpaRepository',
      },
      {
        type: 'comparison',
        heading: 'Common Query Operations',
        django: `# CRUD operations
Article.objects.all()
Article.objects.get(pk=1)        # raises DoesNotExist
Article.objects.filter(published=True)
Article.objects.exclude(published=False)
Article.objects.create(title="New", content="...")
article.save()
article.delete()

# Filtering
Article.objects.filter(
    title__icontains="django"
)
Article.objects.filter(
    created_at__gte=datetime(2024, 1, 1)
)
Article.objects.order_by('-created_at')
Article.objects.count()
Article.objects.first()`,
        springBoot: `// CRUD operations (built into JpaRepository)
repository.findAll()
repository.findById(1L)  // returns Optional<Article>
repository.save(article) // insert or update
repository.delete(article)
repository.deleteById(1L)
repository.count()

// Derived query methods — Spring Data reads the
// method NAME and auto-generates the SQL:
interface ArticleRepository : JpaRepository<Article, Long> {
    fun findByPublishedTrue(): List<Article>
    fun findByTitleContainingIgnoreCase(
        title: String
    ): List<Article>
    fun findByCreatedAtAfter(
        date: Instant
    ): List<Article>
    fun findAllByOrderByCreatedAtDesc(): List<Article>
    fun countByPublishedTrue(): Long
    fun findFirstByOrderByCreatedAtDesc(): Article?
}`,
        djangoLabel: 'Django QuerySet API',
        springBootLabel: 'Spring Data derived queries',
      },
      {
        type: 'comparison',
        heading: 'Custom Queries (JPQL)',
        body: 'For complex queries, use @Query with JPQL (Java Persistence Query Language) — similar to Django\'s Q objects and raw SQL but object-oriented:',
        django: `from django.db.models import Q

# Complex filter
Article.objects.filter(
    Q(title__icontains="spring") |
    Q(content__icontains="spring"),
    published=True
).select_related('author')

# Raw SQL
Article.objects.raw(
    "SELECT * FROM articles WHERE published = %s",
    [True]
)`,
        springBoot: `// @Query uses JPQL (SQL-like but uses class/field names)
@Repository
interface ArticleRepository : JpaRepository<Article, Long> {

    @Query("""
        SELECT a FROM Article a
        WHERE a.published = true
        AND (
            LOWER(a.title) LIKE LOWER(CONCAT('%', :term, '%'))
            OR LOWER(a.content) LIKE LOWER(CONCAT('%', :term, '%'))
        )
    """)
    fun searchPublished(
        @Param("term") term: String
    ): List<Article>

    // Native SQL (use sparingly)
    @Query(
        value = "SELECT * FROM articles WHERE published = :p",
        nativeQuery = true
    )
    fun findByPublishedNative(
        @Param("p") published: Boolean
    ): List<Article>
}`,
        djangoLabel: 'Django Q objects + raw SQL',
        springBootLabel: 'Spring Data @Query (JPQL)',
      },
      {
        type: 'comparison',
        heading: 'Pagination',
        django: `from django.core.paginator import Paginator

queryset = Article.objects.filter(published=True)
paginator = Paginator(queryset, per_page=10)
page = paginator.get_page(1)

# Django REST Framework pagination:
# Set DEFAULT_PAGINATION_CLASS in settings`,
        springBoot: `// Spring Data has built-in pagination via Pageable
@GetMapping("/articles")
fun listArticles(
    @RequestParam page: Int = 0,
    @RequestParam size: Int = 10
): Page<ArticleDto> {
    val pageable = PageRequest.of(page, size,
        Sort.by("createdAt").descending())
    return repository.findAll(pageable)
        .map { it.toDto() }
}

// Repository automatically supports Pageable:
// findAll(pageable) returns Page<Article>
// with totalElements, totalPages, content, etc.`,
        djangoLabel: 'Django Paginator',
        springBootLabel: 'Spring Data Pageable',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Optional<T> — Handle Not Found Safely',
        body: 'findById() returns Optional<Article>, not Article. Use .orElseThrow { EntityNotFoundException("Article not found") } to throw an exception if not found, similar to Django\'s get_object_or_404(). You can create a custom exception and map it to a 404 response.',
      },
    ],
  },

  {
    id: 'services',
    number: 7,
    title: 'Services Layer',
    subtitle: 'Dependency injection and the @Service pattern',
    sections: [
      {
        type: 'text',
        heading: 'Django Views vs Spring\'s Layered Architecture',
        body: 'In Django, views often contain business logic directly (or you put it in utils.py). Spring Boot enforces a three-layer pattern: Controller (HTTP in/out) → Service (business logic) → Repository (database). This separation makes testing much easier.',
      },
      {
        type: 'comparison',
        heading: 'Service vs Fat View',
        django: `# Django: logic often in views.py directly
@api_view(['POST'])
def create_article(request):
    serializer = CreateArticleSerializer(
        data=request.data
    )
    serializer.is_valid(raise_exception=True)

    # Business logic mixed into view:
    slug = slugify(serializer.validated_data['title'])
    if Article.objects.filter(slug=slug).exists():
        slug = f"{slug}-{uuid4().hex[:6]}"

    article = Article.objects.create(
        **serializer.validated_data,
        slug=slug,
        author=request.user
    )
    return Response(ArticleSerializer(article).data,
                    status=201)`,
        springBoot: `// Controller: only handles HTTP
@RestController
@RequestMapping("/api/articles")
class ArticleController(
    private val articleService: ArticleService // injected
) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestBody @Valid request: CreateArticleRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ArticleDto = articleService.create(request, user)
}

// Service: contains business logic
@Service
@Transactional
class ArticleService(
    private val articleRepository: ArticleRepository
) {
    fun create(
        request: CreateArticleRequest,
        user: UserDetails
    ): ArticleDto {
        val slug = generateUniqueSlug(request.title)
        val article = Article(
            title = request.title,
            content = request.content,
            slug = slug
        )
        return articleRepository.save(article).toDto()
    }

    private fun generateUniqueSlug(title: String): String {
        val base = title.lowercase()
            .replace(Regex("[^a-z0-9]+"), "-")
        return if (articleRepository
                .existsBySlug(base)) "\$base-\${UUID.randomUUID()
                .toString().take(6)}"
               else base
    }
}`,
        djangoLabel: 'Django fat view (logic in view)',
        springBootLabel: 'Spring Controller + Service split',
      },
      {
        type: 'text',
        heading: 'Dependency Injection — The Core of Spring',
        body: 'This is the biggest conceptual shift from Django. In Spring, objects (Beans) don\'t instantiate their dependencies directly — Spring\'s IoC container creates and injects them. When ArticleController declares private val articleService: ArticleService in its constructor, Spring automatically provides the ArticleService instance. You never write new ArticleService().',
      },
      {
        type: 'comparison',
        heading: 'Constructor Injection (the recommended way)',
        django: `# Django: no DI framework — you import directly
# views.py
from .models import Article
from .serializers import ArticleSerializer
from .utils import send_notification

# You just import and call. Simple but harder to test
# (mocking requires patching).

def create_article(request):
    # Direct use — tightly coupled
    send_notification("New article created")`,
        springBoot: `// Spring: declare dependencies in constructor
// Spring wires them automatically.

@Service
class ArticleService(
    private val articleRepository: ArticleRepository,
    private val emailService: EmailService,  // injected
    private val slugGenerator: SlugGenerator // injected
) {
    fun create(request: CreateArticleRequest): ArticleDto {
        val article = Article(title = request.title,
                               content = request.content)
        val saved = articleRepository.save(article)
        emailService.sendNewArticleNotification(saved)
        return saved.toDto()
    }
}

// In tests, you can inject mock implementations:
// ArticleService(mockRepository, mockEmailService, ...)
// No patching needed!`,
        djangoLabel: 'Django direct imports (no DI)',
        springBootLabel: 'Spring constructor injection',
      },
      {
        type: 'comparison',
        heading: 'Transactions',
        django: `# Django: transaction.atomic() decorator
from django.db import transaction

@transaction.atomic
def transfer_article(from_user, to_user, article_id):
    article = Article.objects.get(pk=article_id)
    article.author = to_user
    article.save()
    # If anything raises, whole operation rolls back`,
        springBoot: `// Spring: @Transactional annotation
// @Service classes are typically @Transactional at class level

@Service
@Transactional  // all public methods are transactional
class ArticleService(
    private val articleRepository: ArticleRepository
) {
    fun transferArticle(
        fromUserId: Long,
        toUserId: Long,
        articleId: Long
    ) {
        val article = articleRepository
            .findById(articleId)
            .orElseThrow { NotFoundException("Not found") }
        val newAuthor = userRepository.getReferenceById(toUserId)
        articleRepository.save(article.copy(author = newAuthor))
        // Exception = automatic rollback
    }
}`,
        djangoLabel: 'Django transaction.atomic',
        springBootLabel: 'Spring @Transactional',
      },
      {
        type: 'callout',
        variant: 'key',
        title: 'Spring Beans — The Key Concept',
        body: 'Any class annotated with @Service, @Repository, @Controller, or @Component becomes a "bean" managed by Spring\'s container. Spring creates exactly ONE instance (singleton by default) and injects it wherever needed. This is why you never write new ArticleService().',
      },
    ],
  },

  {
    id: 'dtos',
    number: 8,
    title: 'DTOs & Serialization',
    subtitle: 'Jackson and data classes vs DRF Serializers',
    sections: [
      {
        type: 'text',
        heading: 'DRF Serializer vs Jackson + DTO',
        body: 'In Django REST Framework, Serializer classes define both validation AND data shape for input/output. In Spring Boot, these concerns are split: DTOs (plain data classes) define the shape, @Valid + Bean Validation annotations handle validation, and Jackson auto-converts between JSON and DTOs.',
      },
      {
        type: 'comparison',
        heading: 'Defining the Response Shape (Output)',
        django: `# articles/serializers.py
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'content',
                  'published', 'created_at',
                  'author_name']
        read_only_fields = ['id', 'created_at']

    def get_author_name(self, obj):
        return obj.author.get_full_name()`,
        springBoot: `// ArticleDto.kt — the response shape
// Just a Kotlin data class; Jackson serializes it to JSON

data class ArticleDto(
    val id: Long,
    val title: String,
    val content: String,
    val published: Boolean,
    val createdAt: Instant,
    val authorName: String  // computed field
)

// Extension function to convert Entity → DTO
// (keeps conversion logic near the DTO)
fun Article.toDto() = ArticleDto(
    id = id,
    title = title,
    content = content,
    published = published,
    createdAt = createdAt,
    authorName = author.fullName()
)`,
        djangoLabel: 'DRF ModelSerializer',
        springBootLabel: 'Kotlin data class DTO + Jackson',
      },
      {
        type: 'comparison',
        heading: 'Input Validation (Request DTOs)',
        django: `# DRF handles validation in Serializer
class CreateArticleSerializer(serializers.Serializer):
    title = serializers.CharField(
        max_length=200,
        min_length=3
    )
    content = serializers.CharField(min_length=10)
    published = serializers.BooleanField(default=False)

# In view:
serializer = CreateArticleSerializer(data=request.data)
serializer.is_valid(raise_exception=True)
# Returns 400 with error details automatically`,
        springBoot: `// CreateArticleRequest.kt
// Bean Validation annotations (JSR-380)
import jakarta.validation.constraints.*

data class CreateArticleRequest(
    @field:NotBlank(message = "Title is required")
    @field:Size(min = 3, max = 200)
    val title: String,

    @field:NotBlank(message = "Content is required")
    @field:Size(min = 10)
    val content: String,

    val published: Boolean = false
)

// In controller — @Valid triggers validation:
@PostMapping
fun create(@RequestBody @Valid req: CreateArticleRequest)
    : ArticleDto = service.create(req)

// Returns 400 with field errors automatically
// if validation fails`,
        djangoLabel: 'DRF Serializer validation',
        springBootLabel: 'Bean Validation (@Valid)',
      },
      {
        type: 'comparison',
        heading: 'Controlling JSON Field Names',
        django: `# DRF: use source= for field renaming
class ArticleSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        source='created_at',
        format="%Y-%m-%dT%H:%M:%SZ"
    )

# Django uses snake_case by default
# {"created_at": "2024-01-01T00:00:00Z"}`,
        springBoot: `// application.yml — configure Jackson globally
spring:
  jackson:
    property-naming-strategy: SNAKE_CASE
    # Converts createdAt → created_at in JSON output
    # Kotlin camelCase → JSON snake_case automatically

# OR use @JsonProperty on specific fields:
data class ArticleDto(
    val id: Long,
    @JsonProperty("created_at")  // override naming
    val createdAt: Instant
)

// By default Jackson uses camelCase (createdAt)
// Add SNAKE_CASE strategy to match Django's style`,
        djangoLabel: 'DRF field naming',
        springBootLabel: 'Jackson naming strategy',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Separate Request and Response DTOs',
        body: 'A common Spring Boot pattern is to have separate CreateArticleRequest, UpdateArticleRequest, and ArticleDto (response) classes. This is more explicit than DRF where one Serializer handles both read and write — and it makes validation rules per-operation much cleaner.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Jackson Auto-Configuration',
        body: 'Spring Boot auto-configures Jackson when you have spring-boot-starter-web. You get JSON serialization/deserialization for free. Customize it via spring.jackson.* in application.yml or define a Jackson2ObjectMapperBuilderCustomizer bean.',
      },
    ],
  },

  {
    id: 'configuration',
    number: 9,
    title: 'Configuration',
    subtitle: 'application.yml vs settings.py',
    sections: [
      {
        type: 'text',
        heading: 'settings.py → application.yml',
        body: 'Django centralizes all config in settings.py. Spring Boot uses application.yml (or application.properties). The concepts are the same: database URLs, secret keys, debug flags, allowed hosts — but the format and injection mechanism differ.',
      },
      {
        type: 'comparison',
        heading: 'Core Configuration File',
        django: `# settings.py
import os
from decouple import config

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='mydb'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

INSTALLED_APPS = [
    'rest_framework',
    'articles',
    # ...
]`,
        springBoot: `# application.yml
spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST:localhost}:5432/\${DB_NAME:mydb}
    username: \${DB_USER:postgres}
    password: \${DB_PASSWORD:}
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true

  flyway:
    enabled: true

server:
  port: 8080

app:
  jwt-secret: \${JWT_SECRET:dev-secret-change-in-production}
  cors-origins: \${CORS_ORIGINS:http://localhost:3000}`,
        djangoLabel: 'Django settings.py',
        springBootLabel: 'Spring Boot application.yml',
      },
      {
        type: 'comparison',
        heading: 'Environment-Specific Config (Profiles)',
        body: 'Django uses settings_dev.py / settings_prod.py patterns. Spring Boot has built-in "profiles":',
        django: `# settings/base.py   — shared config
# settings/dev.py    — overrides for dev
# settings/prod.py   — overrides for prod

# dev.py
from .base import *
DEBUG = True
DATABASES = { ... local db ... }

# Run with:
# DJANGO_SETTINGS_MODULE=settings.dev \\
#   python manage.py runserver`,
        springBoot: `# application.yml — base config (always loaded)
spring:
  profiles:
    active: \${SPRING_PROFILES_ACTIVE:dev}

---
# application-dev.yml — loaded when profile=dev
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb_dev
  jpa:
    show-sql: true

---
# application-prod.yml — loaded when profile=prod
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:postgresql://\${PROD_DB_HOST}/mydb

# Run with: SPRING_PROFILES_ACTIVE=prod ./gradlew bootRun`,
        djangoLabel: 'Django settings modules',
        springBootLabel: 'Spring Boot profiles',
      },
      {
        type: 'comparison',
        heading: 'Injecting Config Values into Code',
        django: `# Django: import from settings
from django.conf import settings

def send_email():
    api_key = settings.EMAIL_API_KEY
    host = settings.EMAIL_HOST
    # Direct access`,
        springBoot: `// Spring Boot: @Value injection
@Service
class EmailService(
    @Value("\${app.email.api-key}")
    private val apiKey: String,

    @Value("\${app.email.host}")
    private val host: String
) {
    fun sendEmail() { /* use apiKey, host */ }
}

// Better: @ConfigurationProperties (type-safe)
@ConfigurationProperties(prefix = "app.email")
data class EmailProperties(
    val apiKey: String,
    val host: String,
    val port: Int = 587
)

@Service
class EmailService(private val props: EmailProperties) {
    fun sendEmail() { /* use props.apiKey, props.host */ }
}`,
        djangoLabel: 'Django settings import',
        springBootLabel: 'Spring @Value / @ConfigurationProperties',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Environment Variable Substitution',
        body: 'The \${VAR_NAME:default_value} syntax in application.yml reads from environment variables with a fallback. \${DB_HOST:localhost} means "use $DB_HOST env var, or localhost if not set." This replaces python-decouple or django-environ.',
      },
    ],
  },

  {
    id: 'postgres',
    number: 10,
    title: 'PostgreSQL Integration',
    subtitle: 'Connecting to Postgres and the full CRUD flow',
    sections: [
      {
        type: 'text',
        heading: 'Postgres with Spring Boot',
        body: 'Django\'s database setup is in DATABASES in settings.py. Spring Boot\'s is in application.yml under spring.datasource. The concepts are identical; the JDBC URL format is slightly different from Django\'s individual host/port/name fields.',
      },
      {
        type: 'comparison',
        heading: 'Database Connection Config',
        django: `# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'postgres',
        'PASSWORD': 'secret',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c default_transaction_isolation=serializable'
        },
        'CONN_MAX_AGE': 60,
    }
}`,
        springBoot: `# application.yml
spring:
  datasource:
    # JDBC URL format:
    # jdbc:postgresql://{host}:{port}/{database}
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: secret
    driver-class-name: org.postgresql.Driver

    # HikariCP connection pool (auto-configured)
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout: 30000
      # Equivalent to Django's CONN_MAX_AGE`,
        djangoLabel: 'Django DATABASES setting',
        springBootLabel: 'Spring Boot datasource config',
      },
      {
        type: 'text',
        heading: 'A Complete CRUD Flow End-to-End',
        body: 'Here is a full working example of a CRUD endpoint for Articles — tying together Entity, Repository, Service, Controller, and DTO:',
      },
      {
        type: 'code',
        heading: 'Full Stack: Article CRUD in Spring Boot',
        label: 'Article.kt + ArticleRepository.kt + ArticleService.kt + ArticleController.kt',
        language: 'kotlin',
        code: `// ── Article.kt (Entity) ──────────────────────────────────
@Entity
@Table(name = "articles")
data class Article(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String,
    val content: String,
    val published: Boolean = false,
    val createdAt: Instant = Instant.now()
)

// ── DTOs ─────────────────────────────────────────────────
data class ArticleDto(
    val id: Long, val title: String,
    val content: String, val published: Boolean,
    val createdAt: Instant
)

data class CreateArticleRequest(
    @field:NotBlank @field:Size(max = 200) val title: String,
    @field:NotBlank val content: String,
    val published: Boolean = false
)

fun Article.toDto() = ArticleDto(id, title, content,
                                  published, createdAt)

// ── ArticleRepository.kt ─────────────────────────────────
@Repository
interface ArticleRepository : JpaRepository<Article, Long> {
    fun findAllByPublishedTrue(): List<Article>
}

// ── ArticleService.kt ────────────────────────────────────
@Service
@Transactional
class ArticleService(
    private val repo: ArticleRepository
) {
    @Transactional(readOnly = true)
    fun findAll(): List<ArticleDto> =
        repo.findAll().map { it.toDto() }

    @Transactional(readOnly = true)
    fun findById(id: Long): ArticleDto =
        repo.findById(id)
            .orElseThrow { ResponseStatusException(
                HttpStatus.NOT_FOUND, "Article not found") }
            .toDto()

    fun create(req: CreateArticleRequest): ArticleDto =
        repo.save(Article(
            title = req.title,
            content = req.content,
            published = req.published
        )).toDto()

    fun update(id: Long, req: CreateArticleRequest): ArticleDto {
        val article = repo.findById(id)
            .orElseThrow { ResponseStatusException(
                HttpStatus.NOT_FOUND, "Article not found") }
        return repo.save(article.copy(
            title = req.title,
            content = req.content
        )).toDto()
    }

    fun delete(id: Long) {
        if (!repo.existsById(id))
            throw ResponseStatusException(
                HttpStatus.NOT_FOUND, "Article not found")
        repo.deleteById(id)
    }
}

// ── ArticleController.kt ─────────────────────────────────
@RestController
@RequestMapping("/api/articles")
class ArticleController(
    private val service: ArticleService
) {
    @GetMapping
    fun list(): List<ArticleDto> = service.findAll()

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long): ArticleDto =
        service.findById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestBody @Valid req: CreateArticleRequest
    ): ArticleDto = service.create(req)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody @Valid req: CreateArticleRequest
    ): ArticleDto = service.update(id, req)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Long) = service.delete(id)
}`,
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'HikariCP — Built-in Connection Pooling',
        body: 'Spring Boot auto-configures HikariCP as the connection pool — no extra dependency needed. Django uses persistent connections (CONN_MAX_AGE) but doesn\'t include a connection pool by default. HikariCP is production-ready and tunable via spring.datasource.hikari.* properties.',
      },
    ],
  },

  {
    id: 'security',
    number: 11,
    title: 'Authentication & Security',
    subtitle: 'Spring Security vs Django auth',
    sections: [
      {
        type: 'text',
        heading: 'From Django Auth to Spring Security',
        body: 'Django has built-in authentication (session-based, @login_required, User model). Spring Security is more powerful but also more configurable — it\'s a filter chain that processes every HTTP request. The most common pattern in modern APIs is JWT (stateless token auth).',
      },
      {
        type: 'comparison',
        heading: 'Protecting Endpoints',
        django: `# Django: decorator-based auth
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view, permission_classes
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_protected_view(request):
    return Response({"user": request.user.username})

# Or in class-based views:
class ArticleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]`,
        springBoot: `// Spring Security: configure a SecurityFilterChain bean
@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(
        http: HttpSecurity
    ): SecurityFilterChain {
        http
            .csrf { it.disable() }  // disable for REST APIs
            .sessionManagement {
                it.sessionCreationPolicy(STATELESS)
            }
            .authorizeHttpRequests {
                it.requestMatchers("/api/auth/**").permitAll()
                it.requestMatchers("/api/public/**").permitAll()
                it.anyRequest().authenticated()
                // All other endpoints require auth
            }
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter::class.java
            )
        return http.build()
    }
}`,
        djangoLabel: 'Django @permission_classes',
        springBootLabel: 'Spring Security FilterChain',
      },
      {
        type: 'comparison',
        heading: 'Getting the Current User',
        django: `# Django: request.user is always available
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
    })`,
        springBoot: `// Spring Security: @AuthenticationPrincipal
@GetMapping("/me")
fun me(
    @AuthenticationPrincipal user: UserDetails
): UserDto {
    return UserDto(
        username = user.username,
        roles = user.authorities
            .map { it.authority }
    )
}

// In service methods, use SecurityContextHolder:
val currentUser = SecurityContextHolder
    .getContext()
    .authentication
    .principal as UserDetails`,
        djangoLabel: 'Django request.user',
        springBootLabel: 'Spring @AuthenticationPrincipal',
      },
      {
        type: 'comparison',
        heading: 'Role-Based Access Control',
        django: `# Django: permission strings
@permission_classes([IsAdminUser])
def admin_only_view(request): ...

# Or custom permissions:
class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (obj.author == request.user
                or request.user.is_staff)`,
        springBoot: `// Spring Security: @PreAuthorize
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/articles/{id}")
fun deleteArticle(@PathVariable id: Long) =
    service.delete(id)

// Method-level security:
@PreAuthorize("hasRole('ADMIN') " +
              "or #article.authorId == authentication.name")
fun updateArticle(
    @PathVariable id: Long,
    @RequestBody req: UpdateArticleRequest
): ArticleDto = service.update(id, req)

// Enable with:
// @EnableMethodSecurity on your @Configuration class`,
        djangoLabel: 'Django IsAdminUser / custom permission',
        springBootLabel: 'Spring @PreAuthorize',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Recommended Auth Library: Spring Boot + JWT',
        body: 'Add io.jsonwebtoken:jjwt-api to your dependencies. The flow is: 1) POST /api/auth/login with credentials, 2) Service validates against DB and returns a JWT, 3) Client sends JWT in Authorization: Bearer <token> header, 4) JwtAuthFilter validates it on each request and sets the SecurityContext.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'CORS Configuration',
        body: 'Add .cors { it.configurationSource(corsConfigurationSource()) } to your SecurityFilterChain and define a CorsConfigurationSource bean that allows your React frontend\'s origin. This replaces Django\'s django-cors-headers package.',
      },
    ],
  },

  {
    id: 'testing',
    number: 12,
    title: 'Testing',
    subtitle: 'JUnit 5 + Mockito vs pytest',
    sections: [
      {
        type: 'text',
        heading: 'pytest → JUnit 5',
        body: 'Django tests use pytest (or Django\'s TestCase). Spring Boot uses JUnit 5 for the test framework and Mockito for mocking. The patterns are very similar; the main difference is that Spring Boot has several test slice annotations that boot only part of the application — making tests much faster.',
      },
      {
        type: 'comparison',
        heading: 'Unit Testing a Service',
        django: `# tests/test_article_service.py
import pytest
from unittest.mock import MagicMock, patch
from articles.services import ArticleService

@pytest.fixture
def mock_repo():
    return MagicMock()

def test_create_article(mock_repo):
    mock_repo.create.return_value = Article(
        id=1, title="Test", content="Content"
    )

    service = ArticleService(repo=mock_repo)
    result = service.create(
        CreateArticleRequest(
            title="Test", content="Content"
        )
    )

    assert result.title == "Test"
    mock_repo.create.assert_called_once()`,
        springBoot: `// ArticleServiceTest.kt
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.assertj.core.api.Assertions.*

@ExtendWith(MockitoExtension::class)  // like pytest fixtures
class ArticleServiceTest {

    @Mock  // like MagicMock()
    lateinit var articleRepository: ArticleRepository

    @InjectMocks  // Spring injects the mock above
    lateinit var articleService: ArticleService

    @Test  // like def test_...
    fun \`should create article successfully\`() {
        val request = CreateArticleRequest(
            title = "Test", content = "Content"
        )
        val savedArticle = Article(id = 1L,
            title = "Test", content = "Content")

        \`when\`(articleRepository.save(any()))
            .thenReturn(savedArticle)

        val result = articleService.create(request)

        assertThat(result.title).isEqualTo("Test")
        verify(articleRepository, times(1)).save(any())
    }
}`,
        djangoLabel: 'pytest with MagicMock',
        springBootLabel: 'JUnit 5 with Mockito',
      },
      {
        type: 'comparison',
        heading: 'Integration / API Testing',
        django: `# Django REST Framework APITestCase
from rest_framework.test import APITestCase
from rest_framework import status

class ArticleTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', password='pass'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_article(self):
        data = {'title': 'Test', 'content': 'Content'}
        response = self.client.post(
            '/api/articles/', data, format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.data['title'], 'Test'
        )`,
        springBoot: `// @WebMvcTest — tests ONLY the web layer
// (faster than @SpringBootTest)
@WebMvcTest(ArticleController::class)
class ArticleControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean  // replace real service with mock
    lateinit var articleService: ArticleService

    @Test
    fun \`POST creates article and returns 201\`() {
        val dto = ArticleDto(1L, "Test", "Content",
                              false, Instant.now())
        \`when\`(articleService.create(any()))
            .thenReturn(dto)

        mockMvc.perform(
            post("/api/articles")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"title":"Test","content":"Content"}""")
        )
            .andExpect(status().isCreated)
            .andExpect(jsonPath("$.title").value("Test"))
            .andExpect(jsonPath("$.id").value(1))
    }
}`,
        djangoLabel: 'Django APITestCase',
        springBootLabel: 'Spring @WebMvcTest',
      },
      {
        type: 'comparison',
        heading: 'Full Integration Test with DB',
        django: `# Django: TestCase uses a test database
# Each test runs in a transaction that is rolled back

@pytest.mark.django_db
def test_create_and_retrieve():
    article = Article.objects.create(
        title="Test", content="Content"
    )
    found = Article.objects.get(pk=article.pk)
    assert found.title == "Test"`,
        springBoot: `// @SpringBootTest boots the full app
// Use @Transactional to rollback after each test
@SpringBootTest
@Transactional  // rollback after each test
class ArticleIntegrationTest {

    @Autowired
    lateinit var articleRepository: ArticleRepository

    @Autowired
    lateinit var articleService: ArticleService

    @Test
    fun \`should create and retrieve article\`() {
        val request = CreateArticleRequest(
            title = "Test",
            content = "Integration test content"
        )
        val created = articleService.create(request)

        val found = articleRepository
            .findById(created.id).get()
        assertThat(found.title).isEqualTo("Test")
    }
}`,
        djangoLabel: 'Django @pytest.mark.django_db',
        springBootLabel: 'Spring @SpringBootTest',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Test Slices — Spring\'s Superpower',
        body: '@WebMvcTest — only loads web layer (controllers, filters). @DataJpaTest — only loads JPA layer (repositories, entities). @SpringBootTest — loads everything. Use the narrowest slice that covers your test to keep the suite fast.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'AssertJ — Fluent Assertions Like pytest',
        body: 'Spring Boot test starter includes AssertJ. Use assertThat(result).isEqualTo("value"), assertThat(list).hasSize(3).contains(item), etc. Far more readable than JUnit\'s assertEquals(expected, actual) syntax.',
      },
    ],
  },
];
