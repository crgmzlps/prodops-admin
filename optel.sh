export OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.nr-data.net:4317
export OTEL_EXPORTER_OTLP_HEADERS=api-key=ebd28325141a2db1bc1fbf558f57190846f8NRAL
export NEW_RELIC_LICENSE_KEY=ebd28325141a2db1bc1fbf558f57190846f8NRAL
# export OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT=4095
# npm run start:dev
# npm run build
# npm run start:prod:optel

docker run --rm \
  -e OTEL_EXPORTER_OTLP_ENDPOINT \
  -e NEW_RELIC_LICENSE_KEY \
  -p 4318:4318 \
  -v "${PWD}/otel-config.yaml":/otel-config.yaml \
  --name otelcol \
  signoz/signoz-otel-collector:0.55.0-rc.3 \
  --config otel-config.yaml

# docker run -rm -d \
#   -e OTEL_EXPORTER_OTLP_ENDPOINT \
#   -e NEW_RELIC_LICENSE_KEY \
# --name signoz-host-otel-collector \
# -v $(pwd)/otel-config.yaml:/etc/otel/config.yaml \ 
# signoz/signoz-otel-collector:0.55.0-rc.3


# --user root \

# docker run \
#   -d \
#   --name newrelic-infra \
#   --network=host \
#   --cap-add=SYS_PTRACE \
#   --privileged \
#   --pid=host \
#   -v "/:/host:ro" \
#   -v "/var/run/docker.sock:/var/run/docker.sock" \
#   -e NRIA_LICENSE_KEY=ebd28325141a2db1bc1fbf558f57190846f8NRAL \
#   newrelic/infrastructure:latest