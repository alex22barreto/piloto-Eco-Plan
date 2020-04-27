package com.ecoplan.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoplan.app.web.rest.TestUtil;

public class TipoActividadTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoActividad.class);
        TipoActividad tipoActividad1 = new TipoActividad();
        tipoActividad1.setId(1L);
        TipoActividad tipoActividad2 = new TipoActividad();
        tipoActividad2.setId(tipoActividad1.getId());
        assertThat(tipoActividad1).isEqualTo(tipoActividad2);
        tipoActividad2.setId(2L);
        assertThat(tipoActividad1).isNotEqualTo(tipoActividad2);
        tipoActividad1.setId(null);
        assertThat(tipoActividad1).isNotEqualTo(tipoActividad2);
    }
}
