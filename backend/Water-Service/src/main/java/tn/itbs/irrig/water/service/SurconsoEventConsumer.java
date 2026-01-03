package tn.itbs.irrig.water.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.config.RabbitMQConfigWater;

@Service
@RequiredArgsConstructor
public class SurconsoEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(SurconsoEventConsumer.class);

    private final AlerteEauService alerteEauService;

    @RabbitListener(queues = RabbitMQConfigWater.SURCONSO_QUEUE)
    public void handleSurconsoEvent(SurconsoEvent event) {
        log.info("Surconsommation reçue pour pompe {} énergie={}", event.pompeId(), event.totalEnergie());
        alerteEauService.enregistrerAlerte(event.pompeId(), event.totalEnergie());
    }

    public record SurconsoEvent(Long pompeId, Double totalEnergie) {}
}