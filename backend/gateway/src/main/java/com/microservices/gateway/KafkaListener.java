package com.microservices.gateway;

public @interface KafkaListener {
    String id();

    String topics();
}
