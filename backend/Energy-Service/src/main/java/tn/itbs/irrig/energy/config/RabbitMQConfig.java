package tn.itbs.irrig.energy.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String SURCONSO_QUEUE = "surconsommation-queue";
    public static final String SURCONSO_EXCHANGE = "ExchangeSurconso";
    public static final String SURCONSO_ROUTING_KEY = "surconso.key";

    @Bean
    public Queue surconsoQueue() {
        return new Queue(SURCONSO_QUEUE, true);
    }

    @Bean
    public TopicExchange exchangeS() {
        return new TopicExchange(SURCONSO_EXCHANGE, true, false);
    }

    @Bean
    public Binding binding(Queue surconsoQueue, TopicExchange exchangeS) {
        return BindingBuilder
                .bind(surconsoQueue)
                .to(exchangeS)
                .with(SURCONSO_ROUTING_KEY);
    }

    @Bean
    public MessageConverter convertir() {
        return new Jackson2JsonMessageConverter();
    }
}
