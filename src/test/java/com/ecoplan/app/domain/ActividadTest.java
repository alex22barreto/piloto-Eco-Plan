package com.ecoplan.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoplan.app.web.rest.TestUtil;

public class ActividadTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Actividad.class);
        Actividad actividad1 = new Actividad();
        actividad1.setId(1L);
        Actividad actividad2 = new Actividad();
        actividad2.setId(actividad1.getId());
        assertThat(actividad1).isEqualTo(actividad2);
        actividad2.setId(2L);
        assertThat(actividad1).isNotEqualTo(actividad2);
        actividad1.setId(null);
        assertThat(actividad1).isNotEqualTo(actividad2);
    }
}
