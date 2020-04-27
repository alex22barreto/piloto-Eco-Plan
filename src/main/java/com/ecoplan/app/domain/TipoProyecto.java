package com.ecoplan.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoProyecto.
 */
@Entity
@Table(name = "tipo_proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoProyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_tipo_proyecto")
    private Integer idTipoProyecto;

    @Column(name = "nombre_tipo_proyecto")
    private String nombreTipoProyecto;

    @OneToMany(mappedBy = "tipo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Proyecto> proyectos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTipoProyecto() {
        return idTipoProyecto;
    }

    public TipoProyecto idTipoProyecto(Integer idTipoProyecto) {
        this.idTipoProyecto = idTipoProyecto;
        return this;
    }

    public void setIdTipoProyecto(Integer idTipoProyecto) {
        this.idTipoProyecto = idTipoProyecto;
    }

    public String getNombreTipoProyecto() {
        return nombreTipoProyecto;
    }

    public TipoProyecto nombreTipoProyecto(String nombreTipoProyecto) {
        this.nombreTipoProyecto = nombreTipoProyecto;
        return this;
    }

    public void setNombreTipoProyecto(String nombreTipoProyecto) {
        this.nombreTipoProyecto = nombreTipoProyecto;
    }

    public Set<Proyecto> getProyectos() {
        return proyectos;
    }

    public TipoProyecto proyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
        return this;
    }

    public TipoProyecto addProyecto(Proyecto proyecto) {
        this.proyectos.add(proyecto);
        proyecto.setTipo(this);
        return this;
    }

    public TipoProyecto removeProyecto(Proyecto proyecto) {
        this.proyectos.remove(proyecto);
        proyecto.setTipo(null);
        return this;
    }

    public void setProyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoProyecto)) {
            return false;
        }
        return id != null && id.equals(((TipoProyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoProyecto{" +
            "id=" + getId() +
            ", idTipoProyecto=" + getIdTipoProyecto() +
            ", nombreTipoProyecto='" + getNombreTipoProyecto() + "'" +
            "}";
    }
}
