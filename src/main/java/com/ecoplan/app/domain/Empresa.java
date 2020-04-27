package com.ecoplan.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Empresa.
 */
@Entity
@Table(name = "empresa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tipo_ident")
    private String tipoIdent;

    @Column(name = "identificacion")
    private String identificacion;

    @Column(name = "razon_social")
    private String razonSocial;

    @Column(name = "celular")
    private Integer celular;

    @Column(name = "email")
    private String email;

    @Column(name = "persona_contacto")
    private Integer personaContacto;

    @ManyToOne
    @JsonIgnoreProperties("empresas")
    private Persona personaContacto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoIdent() {
        return tipoIdent;
    }

    public Empresa tipoIdent(String tipoIdent) {
        this.tipoIdent = tipoIdent;
        return this;
    }

    public void setTipoIdent(String tipoIdent) {
        this.tipoIdent = tipoIdent;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public Empresa identificacion(String identificacion) {
        this.identificacion = identificacion;
        return this;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Empresa razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public Integer getCelular() {
        return celular;
    }

    public Empresa celular(Integer celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(Integer celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public Empresa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPersonaContacto() {
        return personaContacto;
    }

    public Empresa personaContacto(Integer personaContacto) {
        this.personaContacto = personaContacto;
        return this;
    }

    public void setPersonaContacto(Integer personaContacto) {
        this.personaContacto = personaContacto;
    }

    public Persona getPersonaContacto() {
        return personaContacto;
    }

    public Empresa personaContacto(Persona persona) {
        this.personaContacto = persona;
        return this;
    }

    public void setPersonaContacto(Persona persona) {
        this.personaContacto = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", tipoIdent='" + getTipoIdent() + "'" +
            ", identificacion='" + getIdentificacion() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", celular=" + getCelular() +
            ", email='" + getEmail() + "'" +
            ", personaContacto=" + getPersonaContacto() +
            "}";
    }
}
