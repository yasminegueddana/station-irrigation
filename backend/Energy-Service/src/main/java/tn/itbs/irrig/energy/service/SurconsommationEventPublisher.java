package tn.itbs.irrig.energy.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.config.RabbitMQConfig;

@Service
@RequiredArgsConstructor
public class SurconsommationEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishSurconsoEvent(Long pompeId, Double totalEnergie) {
        SurconsoEvent event = new SurconsoEvent(pompeId, totalEnergie);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.SURCONSO_EXCHANGE,   // "ExchangeSurconso"
                RabbitMQConfig.SURCONSO_ROUTING_KEY, // "surconso.key"
                event
        );
    }

    public record SurconsoEvent(Long pompeId, Double totalEnergie) {}
}
