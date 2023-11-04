package com.blackcompany.eeos.program.application.dto;

import com.blackcompany.eeos.program.application.dto.suppport.AbstractProgramResponse;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class GetProgramResponse implements AbstractProgramResponse {

	private Long id;
	private String title;
	private Timestamp programDate;
	private String content;
	private String eventStatus;
}
