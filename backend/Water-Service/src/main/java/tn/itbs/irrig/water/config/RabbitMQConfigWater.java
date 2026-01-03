package tn.itbs.irrig.water.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfigWater {

    public static final String SURCONSO_QUEUE = "surconsommation-queue";

    @Bean
    public Queue surconsoQueue() {
        return new Queue(SURCONSO_QUEUE, true);
    }

    @Bean
    public MessageConverter convertir() {
        return new Jackson2JsonMessageConverter();
    }
}
