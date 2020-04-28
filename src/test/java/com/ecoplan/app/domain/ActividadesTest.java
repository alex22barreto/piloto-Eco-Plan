package com.ecoplan.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoplan.app.web.rest.TestUtil;

public class ActividadesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Actividades.class);
        Actividades actividades1 = new Actividades();
        actividades1.setId(1L);
        Actividades actividades2 = new Actividades();
        actividades2.setId(actividades1.getId());
        assertThat(actividades1).isEqualTo(actividades2);
        actividades2.setId(2L);
        assertThat(actividades1).isNotEqualTo(actividades2);
        actividades1.setId(null);
        assertThat(actividades1).isNotEqualTo(actividades2);
    }
}
