<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { http } from '@/services/httpBase';

const router = useRouter();
const courses = ref<any[]>([]);
const loading = ref(true);

const fetchPopularCourses = async () => {
  try {
    const { data } = await http.get<any>('courses/popular');
    // Map response if necessary, or use directly if structure matches
    // Teachable course structure has: name, heading, description, image_url
    // Teachable courses response structure: { courses: { courses: [], meta: {} } }
    const coursesData = data.courses?.courses || data.courses || [];

    if (Array.isArray(coursesData)) {
      courses.value = coursesData.map((c: any) => ({
        id: c.id,
        title: c.name || c.heading || 'Curso Sin Título',
        image: c.image_url || 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=500&auto=format&fit=crop', // Fallback
        category: 'Profesional', // Teachable doesn't expose categories easily in basic list, defaulting
        rating: 5.0, // Mock rating for functionality
        lessons: c.lecture_sections ? c.lecture_sections.reduce((acc: number, sec: any) => acc + (sec.lectures ? sec.lectures.length : 0), 0) : 10,
        instructor: 'Fudmaster Academy', // Default instructor
        instructorAvatar: 'https://ui-avatars.com/api/?name=Fudmaster&background=random'
      }));
    }
  } catch (error) {
    console.error('Failed to fetch popular courses:', error);
  } finally {
    loading.value = false;
  }
};

const goToCourse = (id: number) => {
  console.log('Navigating to course', id);
  // If public, maybe go to details? Or login to view?
  router.push(`/login`);
};

onMounted(() => {
  fetchPopularCourses();
});
</script>

<template>
  <section class="courses-section" id="courses">
    <div class="container">
      <div class="header">
        <h2 class="section-title">Cursos Populares</h2>
        <!-- <a href="#" class="view-all">Ver Todos -></a> -->
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
      </div>

      <div v-else class="courses-grid">
        <div 
          v-for="course in courses" 
          :key="course.id" 
          class="course-card"
          @click="goToCourse(course.id)"
        >
          <div class="image-wrapper">
             <img :src="course.image" :alt="course.title" class="course-image" />
             <div class="badge-category">{{ course.category }}</div>
             <button class="favorite-btn"><i class="fa-solid fa-heart" /></button>
          </div>
          
          <div class="card-body">
            <div class="meta">
               <div class="rating"><i class="fa-solid fa-star" /> {{ course.rating }}</div>
               <div class="lessons"><i class="fa-solid fa-book" /> {{ course.lessons }} Lecciones</div>
            </div>
            
            <h3 class="course-title">{{ course.title }}</h3>
            
            <div class="instructor">
              <img :src="course.instructorAvatar" alt="Instructor" class="avatar" />
              <span class="name">{{ course.instructor }}</span>
            </div>
            
            <div class="progress-container">
               <span class="action-text">Inscribirse Ahora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.courses-section {
  padding: 80px 20px;
  background-color: $bg-alt;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  min-height: 300px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba($FUDMASTER-TEAL, 0.1);
  border-left-color: $FUDMASTER-TEAL;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .section-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: $FUDMASTER-PRIMARY;
  }

  .view-all {
    color: $FUDMASTER-TEAL;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.courses-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.course-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}

.image-wrapper {
  position: relative;
  height: 200px;

  .course-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .badge-category {
    position: absolute;
    top: 15px;
    left: 15px;
    background: rgba(255, 255, 255, 0.9);
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    color: $FUDMASTER-PRIMARY;
    text-transform: uppercase;
  }

  .favorite-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #DA4167; // Pink heart
    font-size: 1.2rem;

    &:hover {
      background: white;
    }
  }
}

.card-body {
  padding: 24px;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: $text-muted;
}

.course-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: $FUDMASTER-PRIMARY;
  margin-bottom: 16px;
  line-height: 1.4;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-size: 0.95rem;
    color: $text-muted;
  }
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;

  .action-text {
    font-weight: 600;
    color: $FUDMASTER-TEAL;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

