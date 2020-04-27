package com.ecoplan.app.config;

import io.github.jhipster.config.JHipsterProperties;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.ecoplan.app.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.ecoplan.app.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.ecoplan.app.domain.User.class.getName());
            createCache(cm, com.ecoplan.app.domain.Authority.class.getName());
            createCache(cm, com.ecoplan.app.domain.User.class.getName() + ".authorities");
            createCache(cm, com.ecoplan.app.domain.TipoProyecto.class.getName());
            createCache(cm, com.ecoplan.app.domain.TipoProyecto.class.getName() + ".proyectos");
            createCache(cm, com.ecoplan.app.domain.TipoActividad.class.getName());
            createCache(cm, com.ecoplan.app.domain.TipoActividad.class.getName() + ".actividades");
            createCache(cm, com.ecoplan.app.domain.Estado.class.getName());
            createCache(cm, com.ecoplan.app.domain.Estado.class.getName() + ".actividades");
            createCache(cm, com.ecoplan.app.domain.Estado.class.getName() + ".proyectos");
            createCache(cm, com.ecoplan.app.domain.Persona.class.getName());
            createCache(cm, com.ecoplan.app.domain.Persona.class.getName() + ".empresas");
            createCache(cm, com.ecoplan.app.domain.Empresa.class.getName());
            createCache(cm, com.ecoplan.app.domain.Proyecto.class.getName());
            createCache(cm, com.ecoplan.app.domain.Actividades.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }
}
