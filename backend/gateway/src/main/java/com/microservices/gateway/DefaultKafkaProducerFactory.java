package com.microservices.gateway;

import java.util.Map;

public class DefaultKafkaProducerFactory<T, T1> extends ProducerFactory<Integer, String> {
    public DefaultKafkaProducerFactory(Map<T1, Object> senderProps) {
        super();
    }
}
