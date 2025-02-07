FROM odoo:17.0

ARG LOCALE=en_US.UTF-8

ENV LANGUAGE=${LOCALE}
ENV LC_ALL=${LOCALE}
ENV LANG=${LOCALE}

USER root

# Actualiza las dependencias y establece las configuraciones regionales
RUN apt-get update && apt-get install -y --no-install-recommends locales netcat-openbsd \
    && locale-gen ${LOCALE}

# Establece el directorio de trabajo
WORKDIR /app

# Copia el script de entrada (entrypoint)
COPY --chmod=755 entrypoint.sh ./

# Copia los módulos personalizados
COPY ./custom-modules /mnt/extra-addons

# Establece el entrypoint
ENTRYPOINT ["/bin/sh"]

# Ejecuta el script de entrada
CMD ["entrypoint.sh"]
