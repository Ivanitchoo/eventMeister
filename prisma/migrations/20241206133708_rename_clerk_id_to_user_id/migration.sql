-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,
    `category_description` VARCHAR(1024) NULL,

    UNIQUE INDEX `category_name_UNIQUE`(`category_name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(1024) NULL,
    `location` VARCHAR(1000) NULL,
    `image_url` VARCHAR(1024) NOT NULL,
    `isFree` TINYINT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NULL,
    `url` VARCHAR(1000) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `start_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `terminate_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `category` INTEGER NULL,
    `organizer` INTEGER NULL,

    UNIQUE INDEX `event_id_UNIQUE`(`event_id`),
    INDEX `fk_event_category_idx`(`category`),
    INDEX `fk_event_organizer_idx`(`organizer`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `quantity` INTEGER NULL,
    `total_amount` DECIMAL(10, 2) NULL,
    `ordered_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `order_status_id` INTEGER NULL,

    INDEX `fk_order_status_idx`(`order_status_id`),
    INDEX `fk_user_order_idx`(`user_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderStatus` (
    `status_id` INTEGER NOT NULL,
    `status` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `status_UNIQUE`(`status`),
    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `ticket_id` INTEGER NOT NULL,
    `event_id` INTEGER NULL,
    `ticket_type_id` INTEGER NULL,
    `price` DECIMAL(10, 2) NULL,
    `ticket_status_id` INTEGER NULL,

    UNIQUE INDEX `ticket_id_UNIQUE`(`ticket_id`),
    INDEX `fk_event_ticket_idx`(`event_id`),
    INDEX `fk_ticket_status_idx`(`ticket_status_id`),
    INDEX `fk_ticket_type_idx`(`ticket_type_id`),
    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketStatus` (
    `status_id` INTEGER NOT NULL,
    `ticket_status` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `ticket_status_UNIQUE`(`ticket_status`),
    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketType` (
    `type_id` INTEGER NOT NULL,
    `ticket_type` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `ticket_type_UNIQUE`(`ticket_type`),
    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL,
    `external_id` VARCHAR(1024) NULL,
    `email` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `photo` VARCHAR(1000) NULL,

    UNIQUE INDEX `external_id_UNIQUE`(`external_id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `order_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    INDEX `fk_item_idx`(`item_id`),
    PRIMARY KEY (`order_id`, `item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `fk_event_category` FOREIGN KEY (`category`) REFERENCES `Category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `fk_event_organizer` FOREIGN KEY (`organizer`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `fk_order_status` FOREIGN KEY (`order_status_id`) REFERENCES `OrderStatus`(`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `fk_event_ticket` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `fk_ticket_status` FOREIGN KEY (`ticket_status_id`) REFERENCES `TicketStatus`(`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `fk_ticket_type` FOREIGN KEY (`ticket_type_id`) REFERENCES `TicketType`(`type_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `fk_item` FOREIGN KEY (`item_id`) REFERENCES `Ticket`(`ticket_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
